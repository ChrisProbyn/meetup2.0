import React, {Component} from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

export default class CreateGroup extends Component {
  state = { grpname: ''}

  //implement onpress function to link back to group component...

  onChangeText = grpname => this.setState({ grpname }); 

  render() {
    return (
      <View style={styles.container}>
      <Text style={styles.title}>Enter your group name:</Text>
      <TextInput
        onChangeText={this.onChangeText}
        style={styles.nameInput}
        placeHolder="Group"
        value={this.state.name}
      />
      <TouchableOpacity onPress={this.onPress}>
        <Text style={styles.buttonText}>Create</Text>
      </TouchableOpacity>
    </View>
    );
  }
}

  const offset = 24;
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    nameInput: {
      backgroundColor: 'white',
      borderColor: 'black',
      borderWidth: 1,
      borderRadius: 10,
      height: 35,
      minWidth: '80%',
      bottom: 0,
    },
    title: {
      marginTop: offset,
      marginLeft: offset,
      fontSize: offset,
    },
    buttonText: {
      marginLeft: offset,
      fontSize: offset,
    },
  });