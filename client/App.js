import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Map from './components/map components/Map.js';
import Chat from './components/chat components/chat.js';


export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mapSection :false,
      chatSection :false,
      defaultSection :true,
      backgroundImage: "https://beautifulpixels.com/wp-content/uploads/2018/09/bpxl-iphone-xs-max-wallpaper-1-400x866.jpg",
      users: [
        {
          _id: 1,
          name: "Alex",
          email: "example1@gmail.com",
          password: "123",
          image: "",
        },
        {
          _id: 2,
          name: "Bob",
          email: "example2@gmail.com",
          password: "456",
          image: "",
        },
        {
          _id: 3,
          name: "Chanel",
          email: "example3@gmail.com",
          password: "456",
          image: "",
        },
      ],
      groups: [
        {
          _id: 1,
          group_name: "group 1",
          users_id: [1,2]
        },
        {
          _id: 2,
          group_name: "group 2",
          users_id: [2,3]
        }
      ]
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
