import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Group from './components/group components/group.js';
import Landing from './components/landing components/Landing.js';

var exampleSocket = new WebSocket("ws:localhost:3001");

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      backgroundImage: require("./assets/background.png"),
      currentUserID: null,
      DefaultComponent: false,
      GroupComponent: true,
      users: [
        {
          id: 1,
          email: "Example1@gmail.com",
          password: "123",
          username: "bob",
          image: "",
        },
        {
          id: 2,
          email: "example2@gmail.com",
          password: "456",
          username: "John",
          image: "",
        },
        {
          id: 3,
          email: "example3@gmail.com",
          password: "456",
          username: "Alice",
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

  changeUser = incomingUser =>{
    this.setState({
      currentUserID: incomingUser,
      DefaultComponent: false,
      GroupComponent: true,
    })
  }
  addUser =incomingUser =>{
    const oldUsers = this.state.users;
    const newUsers = [...oldUsers, incomingUser];
    this.setState({ users: newUsers});
    //.then() => 
    // this.setState({
    //   currentUserID: incomingUserID
    // })
  }

  renderDefaultComponent = () => {
    if(this.state.DefaultComponent)
    return <Landing background={this.state.backgroundImage} users={this.state.users} changeUser={this.changeUser} addUser={this.addUser}/>
  }

  renderGroupComponent = () => {
    if(this.state.GroupComponent){
    return <Group groups={this.state.groups} userList={this.state.users}/>
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.renderDefaultComponent()}
        {this.renderGroupComponent()}
      </React.Fragment>
    );
  }
}