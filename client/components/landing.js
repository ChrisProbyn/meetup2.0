import React, {Component} from 'react';
import {StyleSheet, ImageBackground} from 'react-native';
import Login from './login.js';

export default class Landing extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    backgroundImage: require("../assets/background.png")
  };

  render() {
    return (
      <ImageBackground source={this.state.backgroundImage} style={styles.container}>
        <Login navigation={this.props.navigation}/>
      </ImageBackground>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  },
  text: {
    textAlign: 'center',
    fontSize: 45,
    color: 'white',
    marginBottom: 30,
    width: "90%"
  },
});