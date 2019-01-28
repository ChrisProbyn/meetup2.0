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
     <GroupList groups={this.props.groups} userList={this.props.userList}/>
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
        <TopNav />
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
