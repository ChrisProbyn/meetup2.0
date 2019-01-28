import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Map from './components/map components/Map.js';
import Chat from './components/chat components/chat.js';
import Landing from './components/landing components/Landing.js';

export default class App extends React.Component {
  constructor() {
    super()
    
    this.state = {
      viewSection :false,
      backgroundImage: require("./assets/background.png"),
      currentUserID: null,
      users: [
        {
          id: 1,
          email: "Example1@gmail.com",
          password: "123",
          image: "",
        },
        {
          id: 2,
          email: "example2@gmail.com",
          password: "456",
          image: "",
        },
        {
          id: 3,
          email: "example3@gmail.com",
          password: "456",
          image: "",
        },
      ],
      groups: [
        {
          id: 1,
          group_name: "group 1",
          users_id: [1,2]
        },
        {
          id: 2,
          group_name: "group 2",
          users_id: [2,3]
        }
      ],
      messages: [
        {
        group_id: 1,
        user_id: 1,
        content: "This is user 1 typing!"
      },
      {
        group_id: 1,
        user_id: 2,
        content: "This is user 2 typing!"
      },
      {
        group_id: 2,
        user_id: 3,
        content: "This is user 3 typing!"
      }] 
    }
    this.changeUser = this.changeUser.bind(this);
    this.addUser = this.addUser.bind(this);
  }

  renderBottomComponent() {
    if(this.state.viewSection) {
      return (
      <Map />
      )
    }
  }

buttonPress=()=>{
    this.setState({viewSection:true})
}

changeUser = incomingUser =>{
  this.setState({
    currentUserID: incomingUser
  })
}
addUser =incomingUser =>{
  const oldUsers = this.state.users;
  const newUsers = [...oldUsers, incomingUser];
  this.setState({ users: newUsers});
  //then
  // this.setState({
  //   currentUserID: incomingUserID
  // })

 }
  render() {
    return (
      <React.Fragment>
        {/* <View style={styles.container}>
      <TouchableOpacity onPress={this.buttonPress}>
          <Text> Click Me!</Text>
      </TouchableOpacity>
      </View> */}

      <Landing background={this.state.backgroundImage} users={this.state.users} changeUser={this.changeUser} addUser={this.addUser}/>
      {/* <View><Text>${this.state.currentUserID}</Text></View> */}
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
