import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Map from '../map components/Map.js';
import Chat from '../chat components/chat.js';
import TopNav from './topnav.js';
import BottomNav from './bottomnav.js';
import GroupList from './grouplist.js';


export default class Group extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mapSection: true,
      chatSection: false,
      defaultSection: false,
      createGroupSection: false
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
     <GroupList groups={this.props.groups} userList={this.props.userList} addGroupState={this.state.createGroupSection}/>
      )
    }
  }

  buttonMapPress=()=>{
      this.setState({mapSection:true, defaultSection: false})
  }

  buttonChatPress=()=>{
    this.setState({chatSection:true, defaultSection: false})
  }
  buttonCreateGroupPress=(state)=>{
    this.setState({
      createGroupSection: state
    })
  }
  buttonBackPress=(state)=>{
    let currentPage;
    for (let a in this.state) {
      if(this.state[a]) {
        this.setState({
          defaultSection: state,
          [a]: false
        })
      }
    }
    // console.log(currentPage)
    // this.setState({
    //   defaultSection: state,
    //   currentPage: false
    // })
  }

  render() {
    return (
      <React.Fragment>
        <TopNav add={this.buttonCreateGroupPress} back={this.buttonBackPress}/>
        {this.renderDefaultComponent()}
        {this.renderChatComponent()}
        {this.renderMapComponent()}
      {/* <BottomNav /> */}
    </React.Fragment>
    );
  }
}
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
