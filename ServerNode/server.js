// server.js

const express = require('express');
const SocketServer = require('ws');
const uuidv4 = require('uuid/v4');
const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
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
    asian: Int
    bar: Int
    steak: Int
    pizza: Int
    bbq: Int
    mexican: Int
    italian: Int
  }

  type Nightlife_preferences {
    id: ID
    nightclub: Int
    bar: Int
    pub: Int
  }
  type Group {
    id: ID
    Group_name: String
  }

  type User {
    id: ID
    email: String
    password: String
    username: String
    location: Location
    group: [Group]
    food_preferences: Food_preferences
    nightlife_preferences: Nightlife_preferences
  }


  type Query {
    locations: [Location]
    groups: [Group]
    users: [User]
   
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
    groups: () => {
      return knex('groups');
    },
    users: () => {
      return knex('users');
    }
  //   teams: () => {
  //     return knex('teams');
  //   },
  //   player: (root, args, context, info) => {
  //     return knex('players').where('id', args.id).then(player => player[0]);
  //   },
  //   team: (root, args) => {
  //     return knex('teams').where('city', args.city).then(team => team[0]);
  //   }
  // },
  // Mutation: {
  //   editPlayer: (root, {name, position}, context, info) => {
  //     const player = knex('players').update({position}).where('name', name).returning('*').then(player => player[0]);
  //   },
  //   firePlayer: (root, {id}) => {
  //     return knex('players').del().where('id', id).returning('*').then(player => player[0]);
  //   }
  // },
  // Player: {
  //   team(player) {
  //     return knex('teams').where('id', player.team_id).then(team => team[0]);
  //   }
  // },
  // Team: {
  //   players(team) {
  //     return knex('players').where('team_id', team.id).then(players => players);
  //   }
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
