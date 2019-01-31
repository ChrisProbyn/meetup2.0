import React, {Component} from 'react';
import {View, Button, Alert} from 'react-native';
  import { Query } from "react-apollo";
import gql from "graphql-tag";
import t from 'tcomb-form-native';

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


    handleSubmitLogin = () => {
        const users = this.props.users;
        const value = this._form.getValue();
        let userPassword = "";
        let userID;
        
        if(value){
        for(var user of users){
          if (user.email === value.email) {
            userPassword = user.password
            userID = user.id;
          } 
        }
        if(!userPassword){
          Alert.alert(
            'Email does not exist',
            'there is no registered user with that email',
            [
              
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
          );
        } else {
        if(value.password === userPassword) {
          this.props.changeUser(userID)
        } else{
          Alert.alert(
            'Wrong Password',
            'incorrect password',
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
      handleSubmitSignup = () => {
        const users = this.props.users;
        const value = this._form.getValue();
        console.log(value)
        if(value){
          for(var user of users){
            if (user.email === value.email) {
              //error existing email
            } 
          }
          let newUser = {
            email: value.email,
            password: value.password,
            username: value.username
          }
          this.props.addUser(newUser)
       
        }
      }
      
    render() {
      return (
          <View >
        <Form 
          ref={c => this._form = c}
          type={User} 
          options={options}
          style={{color: 'white'}}
        />
        <Button
          title="Login!"
          onPress={this.handleSubmitLogin}
          color="white"
          
        />
         <Button
          title="Sign Up!"
          onPress={this.handleSubmitSignup}
          color="white"
        />
      </View>
      );
    }
  }

