import React, {Component} from 'react';
import {View, Button, Alert, Text} from 'react-native';
import t from 'tcomb-form-native';
import { Query } from "react-apollo";
import gql from "graphql-tag";

import ApolloClient from "apollo-boost"

const apolloClient = new ApolloClient({
  uri: "http://192.168.88.68:4000/graphql"
 });

const Form = t.form.Form;
const User = t.struct({
    email: t.String,
    username: t.maybe(t.String),
    password: t.String,
    terms: t.Boolean
  });
  
  const formStyles = {
    ...Form.stylesheet,
    formGroup: {
      normal: {
        marginBottom: 10,
        color: 'white'
      },
    },
    textbox: {
      normal: {
      color: "white",
        fontSize: 15,
      height: 36,
      paddingHorizontal: 7,
      borderRadius: 4,
      borderColor: "white",
      borderWidth: 1,
      marginBottom: 5,
      fontWeight: '600'
      },
      error: {
        color: "white",
        fontSize: 15,
      height: 36,
      paddingHorizontal: 7,
      borderRadius: 4,
      borderColor: "red",
      borderWidth: 1,
      marginBottom: 5,
      fontWeight: '600'
      }
    },
    controlLabel: {
      normal: {
        color: 'white',
        fontSize: 18,
        marginBottom: 7,
        fontWeight: '600'
      },
      // the style applied when a validation error occours
      error: {
        color: 'red',
        fontSize: 18,
        marginBottom: 7,
        fontWeight: '600'
      },
    }
  }
  
  const options = {
    fields: {
      email: {
      
      },
      password: {
       
      },
      terms: {
      
      },
    },
    stylesheet: formStyles,
  };

export default class Login extends Component {
  constructor(props) {
    super(props)
  }
    handleSubmitLogin = (data) => {
        const users = data.users;
        const value = this._form.getValue();
    
        let userPassword = "";
        let userID;
        
        if(value){
        for(let user of users){
          if (user.email === value.email) {
     
            userPassword = user.password
            userID = user.id;
            
          } 
        }
        if(!userPassword){
          Alert.alert(
            'Incorrect Credentials',
            'Incorrect Credentials',
            [
              
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
          );
        } else {
        if(value.password === userPassword) {
          this.props.navigation.navigate('Group', {userID: userID});
        } else{
          Alert.alert(
            'Incorrect Credentials',
            'Incorrect Credentials',
            [
              
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
          );
          //need to display error
          }
        }
      }
       
    }
    validateEmail(email) 
    {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
    }
    handleSubmitSignup = (data) => {
      const users = data.users;
      const value = this._form.getValue();
      
      
      if(value && !value.terms){
        Alert.alert(
          'Agree to terms',
          'Agree to terms',
          [
            
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          {cancelable: false},
        )
      }else if(value && value.terms) {
       
        for(var user of users){
          if (user.email === value.email) {
    
            Alert.alert(
              'Incorrect Credentials',
              'Incorrect Credentials',
              [
                
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ],
              {cancelable: false},
            )
          } 
        }
        if(this.validateEmail(value.email)){
        let newUser = {
          email: value.email,
          password: value.password,
          username: value.username
        }
       
        apolloClient.mutate({
          variables: { email: newUser.email, username: newUser.username, password: newUser.password },
          mutation: gql`
            mutation CreateUser($email: String, $username: String,  $password: String) {
            createUser(email: $email, username: $username,  password: $password) {
             id
             username
            }
           }
          `,
          
        })
        .then(result => { this.props.navigation.navigate('Group',{userID: result.data.createUser.id}) })
        .catch(error => { console.log(error) });
      } else {
        Alert.alert(
          'Invalid email',
          'Invalid email',
          [
            
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          {cancelable: false},
        )
      }
      }
    }

    render() {
      const query = gql`
      {
        users{
          id
          email
          username
          password
        }
       }`
      //  const formValue =this._form.getValue() || false;
      return (
        <Query query={query}>
        {({loading, error, data}) => {
          if(loading) return <Text>Loading Textlayers...</Text>;
          if(error) return <Text>PLAYER ERROR! {error}</Text>;
 
          return (
          <View >
          <Form 
            ref={c => this._form = c}
            type={User} 
            options={options}
            style={{color: 'white'}}
          />
          <Button
            title="Login"
            onPress={() => {this.handleSubmitLogin(data)}}
            color="white"
          />
          <Button
            title="Sign Up!"
            onPress={() => {this.handleSubmitSignup(data)}}
            color="white"
          />
         
        </View>
          );
        }}
      </Query>
      );
    }
  }
