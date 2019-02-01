// Import the screens
import Main from './components/main.js';
import Chat from './components/chat.js';
import Landing from './components/landing.js';
import Group from './components/group.js';

//Import Apollo
import ApolloClient from "apollo-boost";
import {
  gql,
  graphql,
  ApolloProvider,
 } from 'react-apollo';

 const client = new ApolloClient({
  uri: "http://192.168.88.70:4000/graphql"
 });

//Import React
import React from 'react';

// Import React Navigation
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator
} from 'react-navigation';

export default class App extends React.Component {
  render() {
    /* In the root component we are rendering the app navigator */
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
  }
});

const RootNavigator = createSwitchNavigator({
  Nav: AppNavigator,
})

const AppContainer = createAppContainer(RootNavigator);