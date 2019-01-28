import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import GroupCard from './groupcard.js';

export default class GroupList extends React.Component {
    render() {
        const allGroups = this.props.groups.map((group) => {
            <GroupCard name={group.group_name} users={group.users_id}/>
        })
        return (
            <View style={styles.container}>
                {allGroups}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  