import React, {Component} from 'react';
import ChatBar from './chatbar.js';
import MessageList from './messagelist.js';

export default class Chat extends Component {
    render() {
      return (
        <React.Fragment>
          <MessageList />
          <ChatBar />
        </React.Fragment>
      );
    }
  }