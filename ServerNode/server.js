// server.js
const ENV         = process.env.NODE_ENV || "development";
const { ApolloServer, gql, PubSub, withFilter } = require('apollo-server');
const {makeExecutableSchema} = require('graphql-tools');
const knexConfig = require('./knexfile');
const bcrypt = require('bcrypt');
const knex = require('knex')(knexConfig[ENV]);

const pubsub = new PubSub();

const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.
  type Location {
    id: ID!
    lat: Float
    long: Float
  }

  type Place {
    id: ID!
    type: String
    place_name: String
    location: Location
  }
  type Check {
    state: Boolean
  }
  type Food_preferences {
    id: ID!
    Asian: Int
    Bar_food: Int
    Steak: Int
    Pizza: Int
    BBQ: Int
    Mexican: Int
    Italian: Int
  }

  type Nightlife_preferences {
    id: ID!
    Nightclub: Int
    Bar: Int
    Pub: Int
  }
  type Group {
    id: Int
    Group_name: String
    messages: [Message]
    users: [User]
  }
  type Member {
    id: ID!
    group_id: Int
    user_id: Int
  }

  type User {
    id: ID!
    email: String
    password: String
    username: String
    location: Location
    groups: [Group]
    food_preferences: Food_preferences
    nightlife_preferences: Nightlife_preferences
    messages: [Message]
  }

  type Message {
    id: ID!
    group: Group
    user: User
    text: String
    created_at: String
  }

  type Query {
    locations: [Location]
    location: Location
    groups: [Group]
    group(id: Int): Group
    users: [User]
    user(id: ID): User
    places: [Place]
    messages: [Message]
    
    food_preferences: [Food_preferences]
    nightlife_preferences: Nightlife_preferences
  }

  type Mutation {
    createMessage(userID: Int!, Group_name: String!, text: String!): Message
    changeUserLocation(userID: ID, lat: Float, long: Float): User
    createGroup(Group_name: String, userID: ID): Member
    createUser(email: String, username: String, password: String): Member
    addUserToGroup(groupID: ID, email:String): Member
    #deleteGroup(GroupName: String): Group
    checkUser(email: String, password: String): Boolean

  }
  
  type Subscription {
    messageAdded(groupId: Int!): Message
  }
`;

// Resolvers define the technique for fetching the types defined in the schema. 

const MESSAGE_ADDED = 'messageAdded';

const resolvers = {
  Query: {
    locations: () => {
      const locations = knex('locations').then((res) => {
        const result = res.map((location) => {
          location.lat = parseFloat(location.lat);
          location.long = parseFloat(location.long);
          return location;
        });
        return result;
      });
      return locations;
    },
    
    places: () => {
      return knex("places")
    },
    groups: () => {
      return knex('groups');
    },
    users: () => {
      return knex('users');
    },
    food_preferences: () => {
      return knex('food_preferences');
    },
    nightlife_preferences: () => {
      return knex('nightlife_preferences');
    },
    user: (root, args, context, info) => {
      return knex('users').where('id', args.id).then(user => user[0]);
    },
    messages: () => {
      return knex('messages');
    },
    group: (root, args, context, info) =>{
        return knex('groups').where('id', args.id).then(group => group[0])
    }
    
  },
  User: {
    location(user) {
      return knex.table('users').leftJoin('locations', 'users.location_id', 'locations.id').where('username', `${user.username}`).first('lat',"long")
    },
    nightlife_preferences(user) {
      return knex.table('users').leftJoin('nightlife_preferences', 'users.nightlife_preferences_id', 'nightlife_preferences.id').where('username', `${user.username}`).first('Nightclub',"Bar","Pub");
    },
    food_preferences(user){
      return knex.table('users').leftJoin('food_preferences', 'users.food_preferences_id', 'food_preferences.id').where('username', `${user.username}`).first('Asian',"Bar_food","Steak","Pizza", "BBQ", "Mexican","Italian");
    },
    groups(user) {
      return knex('users').leftJoin('members', 'users.id', 'members.user_id').leftJoin('groups', "members.group_id", "groups.id").where('users.id', `${user.id}`);
    },
    messages(user) {
      return knex.table('users').leftJoin('messages', 'users.id', 'messages.user_id').where('username', `${user.username}`);
    }
  },
  Group:{
    users(group) {
      return knex('groups').leftJoin('members', 'groups.id', 'members.group_id').leftJoin('users', "members.user_id", "users.id").where('groups.id', `${group.id}`).then(user => user);
    },
    
      messages(group) {
        return knex.table('groups').leftJoin('messages', 'messages.group_id', 'groups.id').where("Group_name", `${group.Group_name}`);
      }
  },
  Message: {
    user(message) {
      return knex('messages').leftJoin('users','messages.user_id',"users.id").where("messages.id", `${message.id}`).first("users.id", "email", "username");
    }
  },


  Mutation: {
    createMessage: (root, {userID, Group_name, text}, context, info) => {
      pubsub.publish(MESSAGE_ADDED, { [MESSAGE_ADDED]: {userID, Group_name, text} });
      return knex("groups").where("Group_name", Group_name)
        .then(result => {
        const groupID = result[0].id;
      return knex('messages').returning("*").insert({text: text, group_id: groupID, user_id: userID })
      }).then((result) => {
        return result[0];
      })
    },
    createGroup: (root, {Group_name, userID}, context, info) => {
      return knex('groups').returning("*").insert({Group_name: Group_name}).then((result) => {
        let newGroupId = result[0].id;
        return knex('members').returning('*').insert({group_id: newGroupId, user_id: userID})
      
      }).then((result) => {
          return result[0];
      })
    },
    createUser: (root, {email, username, password}, context, info) => {
      const hashedPassword = bcrypt.hashSync(password, 10);
      return knex('users').returning("*").insert({email: email, username: username, password: hashedPassword}).then((user) => {
        const userId = user[0].id
        return knex("groups").returning('*').insert({Group_name: "Welcome to MeetUp"}).then((group=> {
          return knex("members").returning('*').insert({group_id: group[0].id, user_id: userId})
        }))
      }).then((result) => {
        return result[0];
    });
    },
    addUserToGroup:(root, {groupID, email}, context, info) => {
     
        return knex("users").where("email", email).returning("*").then((userResult) => {
      
          let userID = userResult[0].id
          return knex("members").returning("*").insert({group_id: groupID, user_id: userID})
      
        }).then((user) => user[0])
    },
    changeUserLocation: (root, {userID, lat, long}, context, info) => {
      
      return knex('locations').returning("*").insert({lat: lat, long: long}).then((user) => {
        let location_id = user[0].id
        return knex('users').update({location_id}).where('users.id', userID).returning('*').then(user => user[0])
      })
    },
    checkUser: (root, {email, password}, context, info) => {
      return knex("users").then((users) => {
        for(let user of users) {
          if (user.email === email && bcrypt.compareSync(password, user.password) ) {
            return true;
          }
          
        }
        return false;
      })
     
    }
  },
  Subscription: {
    messageAdded: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(MESSAGE_ADDED),
        (payload, variables) => {
          return payload.groupID === variables.groupID;
        }
      )
    }
  }
};

// const server = new ApolloServer({ typeDefs, resolvers });
const schema = makeExecutableSchema({typeDefs, resolvers});
const server = new ApolloServer({
  schema,
  context: async ({ req, connection }) => {
    if (connection) {
      // check connection for metadata
      return connection.context;
    } else {
      // check from req
      const token = req.headers.authorization || "";

      return { token };
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url} 🚀`);
});