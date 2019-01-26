import React, {Component} from 'react';
import {StyleSheet, View, Text } from 'react-native';

export default class Message extends Component {
    render() {
      return (
          <View style={stylesmessage.container}>
          <Text>This is my first message</Text>
          </View>
      );
    }
  }

  const stylesmessage = StyleSheet.create({
    container: {
      backgroundColor: 'red',
      height: 25,
      left: 0,
      alignItems: 'center',
      justifyContent: 'flex-end',
      width: '100%'
    },
  });