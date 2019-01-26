import React, {Component} from 'react';
import {StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native';

export default class ChatBar extends Component {
    render() {
      return (
        <KeyboardAvoidingView style={styleschat.container} behavior="padding" enabled>
           <TextInput
          placeholder="placeholder"
          style={styleschat.textInput}
          />
        </KeyboardAvoidingView>
      );
    }
  }

  const styleschat = StyleSheet.create({
    container: {
      backgroundColor: 'ivory',
      flex: 1,
      height: '20%',
      left: 0,
      alignItems: 'center',
      justifyContent: 'flex-start',
      width: '100%'
    },
    textInput: {
      backgroundColor: 'white',
      borderColor: 'black',
      borderWidth: 1,
      borderRadius: 10,
      height: 35,
      minWidth: '80%',
      bottom: 0
    }
  });