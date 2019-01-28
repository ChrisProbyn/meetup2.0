import React from 'react';
import { StyleSheet, Text, View, Alert} from 'react-native';


export default class GroupCard extends React.Component {
    render() {
        const allUserNames = this.props.users.map((user) => {
            <Text>{user.email}</Text>
        })
        console.log("here")
        return (
            <View>
                <Text>{this.props.name}</Text>
                {allUserNames}
            </View>
        );
    }
}