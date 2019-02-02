import React, { Component } from 'react';
import { View, FlatList, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Query } from "react-apollo";
import gql from "graphql-tag";

class Group extends Component {
  static navigationOptions = {
    title: 'Groups',
    headerLeft: null,
    headerRight: (
      <Button
        onPress={() => alert('This is a button!')}
        title="create group"
        color="orange"
      />
    ),
  };

  onChatPress = (groupname) => {
    const userID = this.props.navigation.getParam('userID');
    console.log('pass userid', userID);
    this.props.navigation.navigate('Chat', {userID: userID});
  }

  renderGroupMembers = (group) => {
    if(group.users) {
      return (
        <View style={styles.groupMembersContent}>
          {group.users.map((prop, key) => {
            return (
              <Text key={key} style={styles.memberImage}>
                {prop.username}
              </Text>
            );
          })}
        </View>
      );
    }
    return null;
  }

  render() {
    const userid = this.props.navigation.getParam('userID')
    console.log('userid:', userid)
    const query = gql`
    {
      user(id: 6000){
        email
        groups{
          Group_name
          users{
            username
          }
        }
     
      }
     }`

    return (
      <Query query={query}>
      {({loading, error, data}) => {
        if(loading) return <Text>Loading Container...</Text>;
        if(error) return <Text>Group Component ERROR! {error}</Text>;
        return (
          <FlatList
          style={styles.root}
          data={data.user.groups}
          extraData={data}
          ItemSeparatorComponent={() => {
            return (
              <View style={styles.separator}/>
            )
          }}
          keyExtractor={(item)=>{
            return item.Group_name;
          }}
          renderItem={(item) => {
            const Group = item.item;
            let mainContentStyle;
            if(Group.attachment) {
              mainContentStyle = styles.mainContent;
            }
            return(
              <TouchableOpacity onPress={() => {this.onChatPress(Group.Group_name)}}>
              <View style={styles.container} >
                <View style={styles.content}>
                  <View style={mainContentStyle}>
                    <View style={styles.text}>
                      <Text style={styles.groupName} >{Group.Group_name}</Text>
                    </View>
                    <Text style={styles.countMembers}>
                      {Group.countMembers} members
                    </Text>
                    <Text style={styles.timeAgo}>
                      Updated a few seconds ago
                    </Text>
                    {this.renderGroupMembers(Group)}
                  </View>
                </View>
              </View>
              </TouchableOpacity>
            );
          }}/>
        );
      }}
    </Query>
    );
  }
}
const styles = StyleSheet.create({
  root: {
    backgroundColor: "#FFFFFF"
  },
  container: {
    padding: 16,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: "#FFFFFF",
    alignItems: 'flex-start'
  },
  avatar: {
    width:55,
    height:55,
    borderRadius:25,
  },
  text: {
    marginBottom: 5,
    flexDirection: 'row',
    flexWrap:'wrap'
  },
  content: {
    flex: 1,
    marginLeft: 16,
    marginRight: 0
  },
  mainContent: {
    marginRight: 60
  },
  memberImage: {
    height: 30,
    width: 30,
    marginRight:4,
    borderRadius:10,
  },
  separator: {
    height: 1,
    backgroundColor: "#CCCCCC"
  },
  countMembers:{
    color:"#20B2AA"
  },
  timeAgo:{
    fontSize:12,
    color:"#696969"
  },
  groupName:{
    fontSize:23,
    color:"#1E90FF"
  },
  groupMembersContent:{
    flexDirection:'row',
    marginTop:10
  }
}); 

export default Group;