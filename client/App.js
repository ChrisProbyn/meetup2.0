// Import the screens
import Main from './components/main.js';
import Chat from './components/chat.js';
import Landing from './components/landing.js';
import Group from './components/group.js';
import CreateGroup from './components/creategroup.js';
import Map from './components/map.js';

//Import Apollo
import ApolloClient from "apollo-boost";
import { ApolloProvider} from 'react-apollo';

//Import React
import React from 'react';

 const client = new ApolloClient({
  uri: "http://192.168.88.70:4000/graphql"
 });

// Import React Navigation
import {createStackNavigator, createAppContainer, createSwitchNavigator} from 'react-navigation';

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <AppContainer />
      </ApolloProvider>
    )
  }
}

// Create the navigator
const AppNavigator = createStackNavigator({
  Home: {
    screen: Main
  },
  Group: {
    screen: Group
  },
  Chat: {
    screen: Chat
  },
  Landing: {
    screen: Landing
  },
  CreateGroup: {
    screen: CreateGroup
  },
  Map: {
    screen: Map
  }
});

const RootNavigator = createSwitchNavigator({
  Nav: AppNavigator,
})

const AppContainer = createAppContainer(RootNavigator);