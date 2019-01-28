import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Map from '../map components/Map.js';
import Chat from '../chat components/chat.js';


export default class Group extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mapSection :false,
      chatSection :false,
      defaultSection :true,
    }
  }

  renderMapComponent() {
    if(this.state.mapSection) {
      return (
      <Map />
      )
    }
  }

  renderChatComponent() {
    if(this.state.chatSection) {
      return (
      <Chat messages={this.state.messages} />
      )
    }
  }

  renderDefaultComponent() {
    if(this.state.defaultSection) {
      return (
        <View style={styles.container}>
      <TouchableOpacity onPress={this.buttonChatPress}>
          <Text> Let's Chat!</Text>
      </TouchableOpacity>
      </View>
      )
    }
  }

  buttonMapPress=()=>{
      this.setState({mapSection:true, defaultSection: false})
  }

  buttonChatPress=()=>{
    this.setState({chatSection:true, defaultSection: false})
  }

  render() {
    return (
      <React.Fragment>
      {this.renderDefaultComponent()}
      {this.renderChatComponent()}
      {this.renderMapComponent()}
    </React.Fragment>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
