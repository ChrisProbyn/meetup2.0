// server.js

const express = require('express');
const SocketServer = require('ws');
const uuidv4 = require('uuid/v4');
const PORT        = process.env.PORT || 8080;
const ENV         = process.env.NODE_ENV || "development";
const { ApolloServer, gql, PubSub } = require('apollo-server');

const knexConfig = require('./knexfile');

const knex = require('knex')(knexConfig[ENV]);

const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.
  type Location {
    id: ID
    lat: Float
    long: Float
  }

  type Place {
    id: ID
    type: String
    place_name: String
    location: Location
  }

  type Food_preferences {
    id: ID
    Asian: Int
    Bar_food: Int
    Steak: Int
    Pizza: Int
    BBQ: Int
    Mexican: Int
    Italian: Int
  }

  type Nightlife_preferences {
    id: ID
    Nightclub: Int
    Bar: Int
    Pub: Int
  }
  type Group {
    id: ID
    Group_name: String
    messages: [Message]
    users: [User]
  }

  type User {
    id: ID
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
    id: ID,
    group: Group
    user: User
    text: String
    created_at: String
  }

  type Query {
    locations: [Location]
    location: Location
    groups: [Group]
    users: [User]
    user(id: ID): User
    places: [Place]
    messages: [Message]
    
    food_preferences: [Food_preferences]
    nightlife_preferences: Nightlife_preferences
  }

  type Mutation {
    createMessage(username: String, Group_name: String, text: String): Message
    #changeUserLocation(username: String, lat: Float, long: Float): User
    #createGroup(GroupName: String): Group
    #deleteGroup(GroupName: String): Group
    #createPlace()
    #changeUserResterauntPreference():
    #changeUserNightlifePreference():
    #changeUsername()
  }
  
`;

// Resolvers define the technique for fetching the types defined in the schema.  

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
      return knex('users').leftJoin('members', 'users.id', 'members.user_id').leftJoin('groups', "members.group_id", "groups.id").where('username', `${user.username}`);
    },
    messages(user) {
      return knex.table('users').leftJoin('messages', 'users.id', 'messages.user_id').where('username', `${user.username}`);
    }
  },
  Group:{
    users(group) {
      return knex('users').leftJoin('members', 'users.id', 'members.user_id').leftJoin('groups', "members.group_id", "groups.id").where('Group_name', `${group.Group_name}`);
    },
    // users: {
    //   messages(group,user) {
    //     return knex.table('users').leftJoin('groups', 'users.group_id', 'groups.id').leftJoin("messages","users.id", "messages.user_id").where("Group_name","Group 1").andWhere("username","bob")
    //   }
    // }
  },
  // User: {
  //   nightlife_preferences(user) {
  //     return knex.table('users').leftJoin('nightlife_preferences', 'users.nightlife_preferences_id', 'nightlife_preferences.id').where('username', `bob`).first('Nightclub',"Bar","Pub");
  //   }
  // }


  Mutation: {
    createMessage: (root, {username, Group_name, text}, context, info) => {
      let userID = knex('users').where('username', {username}).then((resultUserID) => resultUserID)
      let groupID = knex("groups").where("Group_name", {Group_name}).then((resultGroupID) => resultGroupID)
      let insertMessage = Promise.all([userID,groupID]).then((result) => {
          groupID = result[1][0].id
          userID = result[0][0].id
          console.log(groupID)
          console.log(userID)
          knex('messages').insert({text: {text}, group_id: groupID, user_id: userID })
      })
      return insertMessage;
    },
  }
};






const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});


























// Create a new express server
// const server = express()
//    // Make the express server serve static assets (html, javascript, css) from the /public folder
//   .use(express.static('public'))
//   .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// // Create the WebSockets server
// const wss = new SocketServer.Server({ server });

// // Set up a callback that will run when a client connects to the server
// // When a client connects they are assigned a socket, represented by
// // the ws parameter in the callback.
// wss.broadcast = function(data) {
//   const numOfClients = wss.clients.size;

//   wss.clients.forEach(sock => {
//     console.log("got message")
//     if (sock.readyState === SocketServer.OPEN) {
//       const parsedData = JSON.parse(data);
//       const returnData = Object.assign({id:uuidv4(), clientNumber:numOfClients},parsedData);
      
//       sock.send(JSON.stringify(returnData));
//     } else {
//       sock.terminate();
//     }
//   });
// }


// wss.on('connection', (socket, req) => {
  
//   const clientConnection ={numOfClients: wss.clients.size, Type:"incomingClient", id:uuidv4()};
//   socket.send(JSON.stringify(clientConnection));
//   wss.broadcast(JSON.stringify(clientConnection));

  
//   socket.on('message', wss.broadcast);
//   socket.on('close', () => {
//     console.log('Client disconnected')
//     const clientConnection ={numOfClients: wss.clients.size, Type:"incomingClient", id:uuidv4()};
//     wss.broadcast(JSON.stringify(clientConnection));
//   });
// });
