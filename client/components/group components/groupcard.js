import React from 'react';
import { StyleSheet, Text, View, Alert} from 'react-native';


export default class GroupCard extends React.Component {
    render() {
        const allUserNames = this.props.users.map((user) => {
            <Text>{user.email}</Text>
        })
        console.log("here")
        return (
            Alert.alert(
                'Email does not exist',
                'there is no registered user with that email',
                [
                  
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false},
              )
        );
    }
}