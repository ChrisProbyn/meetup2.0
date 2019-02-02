import React, {Component} from 'react';

import { View, FlatList, ActivityIndicator, Text, StyleSheet, TouchableOpacity, TextInput, } from 'react-native';
import { List, ListItem, SearchBar } from 'react-native-elements';
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

export default class CreateGroup extends Component {
  state = {
    grpname: ""
  }
  //implement onpress function to link back to group component...

  onChangeText = grpname => this.setState({ grpname }); 

  render() {
    const userID = this.props.navigation.getParam("userID")
    const createGroup = gql`
        mutation CreateGroup($Group_name: String, $userID: Int) {
          createGroup(Group_name: $Group_name, userID: $userID) {
            id
            Group_name
      } 
    }
    `
    createNewGroup = () => {

    }
    return (
      <Mutation mutation={createGroup} onCompleted={this.sendComplete}>
      {(createGroup, {data}) => (
      <View style={styles.container}>
      <Text style={styles.title}>Enter your group name:</Text>
      <TextInput
        onChangeText={this.onChangeText}
        style={styles.nameInput}
        placeHolder="Group"
        
      />
      <TouchableOpacity onPress={() => createGroup({variables:{Group_name: this.state.grpname, userID: userID }})}>
        <Text style={styles.buttonText}>Create</Text>
      </TouchableOpacity>
    </View>
      )}
    </Mutation>
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