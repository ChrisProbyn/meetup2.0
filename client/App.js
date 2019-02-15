// Import the screens
import Main from './components/main.js';
import Chat from './components/chat.js';
import Landing from './components/landing.js';
import Group from './components/group.js';
import CreateGroup from './components/creategroup.js';
import Map from './components/map.js';
import apolloClient from './components/apolloClient.js'
//Import Apollo

import { ApolloProvider} from 'react-apollo';

//Import React
import React from 'react';


// Import React Navigation
import {createStackNavigator, createAppContainer, createSwitchNavigator} from 'react-navigation';

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={apolloClient}>
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