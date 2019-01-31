import React from 'react';
import {TabBarIOS} from 'react-native';
import Map from '../map components/Map.js';
import TopNav from './topnav.js';
import GroupList from './grouplist.js';
import Chat from '../chat components/chat.js';

export default class Group extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      defaultSection: true,
      createGroupSection: false,
      navSection: true,
      selectedTab: 'chats'
    }
    this.changeNavState = this.changeNavState.bind(this);
  }

  changeNavState = (event) =>{
    this.setState({
      navSection: event
    })
  }

  renderNavComponent() {
    if(this.state.navSection){
      return (
        <TabBarIOS selectedTab={this.state.selectedTab}>
        <TabBarIOS.Item
          title="Chats"
          selected={this.state.selectedTab === 'chats'}
          icon={require('../../assets/chat-icon.png')}
          renderAsOriginal={true}
          onPress={() => {
              this.setState({
                  selectedTab: 'chats',
              });
          }}>
            <GroupList groups={this.props.groups} userList={this.props.userList} navState={this.changeNavState} addGroupState={this.state.createGroupSection}/>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Map"
          selected={this.state.selectedTab === 'map'}
          icon={require('../../assets/map-icon.png')}
          renderAsOriginal={true}
          onPress={() => {
                this.setState({
                    selectedTab: 'map',
                });
          }}>
          <Map/>
        </TabBarIOS.Item>

        {/* <TabBarIOS.Item
          title="Setting"
          selected={this.state.selectedTab === 'setting'}
          icon={require('../../assets/setting-icon.png')}
          renderAsOriginal={true}
          onPress={() => {
                this.setState({
                    selectedTab: 'setting',
                });
          }}>
          <Setting/>
        </TabBarIOS.Item> */}
      </TabBarIOS>
      )
    }else {
      return(
        <Chat />
      )
    }
  }

  buttonNavPress=()=>{
      this.setState({
        defaultSection: false,
        chatSection: true,
        createGroupSection: false
      })
  }
  buttonCreateGroupPress=(state)=>{
    this.setState({
      defaultSection: false,
      chatSection: false,
      createGroupSection: state
    })
  }

  buttonBackPress=(state)=>{
    for (let currentState in this.state) {
      if(this.state[currentState]) {
        this.setState({
          defaultSection: true,
          [currentState]: state
        })
      }
    }
  }

  render() {
    return (
      <React.Fragment>
       <TopNav add={this.buttonCreateGroupPress} back={this.buttonBackPress}/>
        {this.renderDefaultComponent()}
        {this.renderChatComponent()}
        
      {/* <BottomNav /> */}
    </React.Fragment>
    );
  }
}