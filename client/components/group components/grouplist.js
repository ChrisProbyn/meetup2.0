import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import GroupCard from './groupcard.js';
import CreateGroup from './creategroup.js';

export default class GroupList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            defaultSection: true,
            groupSection :false,
        }
      }
    createGroup=() => {
        this.setState({groupSection:true,defaultSection:false})
    }
    renderGroupComponent() {
        if(this.props.addGroupState) {
          return (
         <CreateGroup/>
          )
        }
    }
    // renderDefaultComponent() {
    //     if(this.state.defaultSection) {
    //       return (
    //         <Button title="Create a new group" onPress={this.createGroup}/>
    //       )}
    //   }
    render() {
        const allGroups = this.props.groups.map((group) => {
            let keyGen = Math.floor(Math.random()*100);
            return <GroupCard name={group.group_name} users={group.users_id} key={keyGen} userList={this.props.userList}/>
        })
        return (
            <View style={styles.container}>
                {allGroups}
                {/* {this.renderDefaultComponent()} */}
                {this.renderGroupComponent()}  
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
      marginBottom: 5,
    },
  });
  