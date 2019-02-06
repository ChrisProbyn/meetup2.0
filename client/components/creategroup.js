import React, {Component} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button } from 'react-native';
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import ApolloClient from "apollo-boost"

const apolloClient = new ApolloClient({
  uri: "http://192.168.88.68:4000/graphql"
 });

export default class CreateGroup extends Component {

  static navigationOptions ={
      headerStyle: {backgroundColor: "#29293d"},
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      title: 'Create A Group',
  };


  state = {
    grpname: ""
  }

  onChangeText = grpname => this.setState({ grpname }); 

  render() {
     createNewGroup = () => {
      const groupname = this.state.grpname;
      const userID = this.props.navigation.getParam("userID")    
      apolloClient.mutate({
        variables: { Group_name: groupname, userID: userID},
        mutation: gql`
          mutation CreateGroup($Group_name: String, $userID: ID) {
          createGroup(Group_name: $Group_name, userID: $userID) {
            id
            group_id
            user_id
          } 
        }
        `,
        
      })
      .then(result => { this.props.navigation.navigate('Group',{userID: result.data.createGroup.user_id})})
      .catch(error => { console.log(error) });
    }
    return (
      <View style={styles.container}>
      <Text style={styles.title}>Enter your group name:</Text>
      <TextInput
        onChangeText={this.onChangeText}
        style={styles.nameInput}
        placeHolder="Group"
      />
      <TouchableOpacity >
        <Button title="Create"
        color= '#ffd700'
        onPress={() => createNewGroup()}/>
      </TouchableOpacity>
    </View>
    );
  }
}

  const offset = 24;
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#3d3d5c',
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
      color: 'white',
    },
    buttonText: {
      marginLeft: offset,
      fontSize: offset,
    },
  });