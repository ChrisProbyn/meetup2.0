import React, { Component } from 'react';
import { ImageBackground, Text, StyleSheet, TouchableOpacity, } from 'react-native';

class Main extends Component {
    state = {
      backgroundImage: require("../assets/background.png")
  }

  static navigationOptions = {
    header: null,
    };    

  onPress = () => {
      this.props.navigation.navigate('Landing');
  }

  render() {
    return (
      <ImageBackground source={this.state.backgroundImage} style={styles.container}>
        <TouchableOpacity onPress={this.onPress}>
          <Text style={styles.text}>MeetUp</Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  }
}
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
export default Main;