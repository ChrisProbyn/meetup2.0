// Import the screens
import Main from './components/main.js';
import Chat from './components/chat.js';
import Landing from './components/landing.js';
import Group from './components/group.js';

//Import React
import React from 'react';

// Import React Navigation
import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator
} from 'react-navigation';

// Create the navigator
const RootStack = createStackNavigator({
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

const App = createAppContainer(RootStack);

// Export it as the root component
export default App