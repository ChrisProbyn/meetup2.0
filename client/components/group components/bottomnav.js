import React, {Component} from 'react';
import Map from '../map components/Map.js';
import Chat from '../chat components/chat.js';
import {TabBarIOS} from 'react-native';

export default class BottomNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
          selectedTab: ''
        };
      }
    render() {
      return (
        <TabBarIOS selectedTab={this.state.selectedTab}>
        <TabBarIOS.Item
          title="Chat"
          selected={this.state.selectedTab === 'chat'}
          icon={require('../../assets/chat-icon.png')}
          onPress={() => {
              this.setState({
                  selectedTab: 'chat',
              });
          }}>
            <Chat/>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          selected={this.state.selectedTab === 'map'}
          icon={require('../../assets/map-icon.png')}
          onPress={() => {
                this.setState({
                    selectedTab: 'map',
                });
          }}>
          <Map/>
        </TabBarIOS.Item>
      </TabBarIOS>
      );
    }
  }