import React, {Component} from 'react';
import {StyleSheet, View } from 'react-native';
import Message from './message.js';

export default class MessageList extends Component {
    render() {
      return (
          <View style={styleslist.container}>
          <Message />
          </View>
      );
    }
  }

  const styleslist = StyleSheet.create({
    container: {
      backgroundColor: '#F0EAD6',
      flex: 8,
    //   height: '80%',
      left: 0,
      alignItems: 'center',
      justifyContent: 'flex-end',
      width: '100%'
    },
  });