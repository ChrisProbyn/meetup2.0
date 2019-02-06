import React, { Component } from 'react';
import { Platform, StyleSheet, View, FlatList, Button, Text, TouchableOpacity } from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import { Query } from "react-apollo";
import gql from "graphql-tag";

export default class Group extends Component {
  state = {
    location: null,
    errorMessage: null,
  };

  static navigationOptions = ({navigation}) => {
    return {
      headerStyle: {backgroundColor: "#212121"},
      headerTintColor: 'white',
      title: 'Groups',
      gesturesEnabled: false,
      headerLeft: (
        <Button
          onPress={() => {
            navigation.navigate('Home');
          }}
          title="Logout"
          color="#8080ff"
        />
      ),
      headerRight: (
        <Button
          onPress={() => {
            const userID = navigation.getParam('userID');
            navigation.navigate('CreateGroup', {userID: userID});
          }}
          title="create group"
          color="orange"
        />
      ),
    }
  };

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };


  onChatPress = (groupid) => {
    const userID = this.props.navigation.getParam('userID');
    this.props.navigation.navigate('Chat', {userID: userID, groupID: groupid});
  }

  renderGroupMembers = (group) => {
    if(group.users) {
      return (
        <View style={styles.groupMembersContent}>
          {group.users.map((prop, key) => {
            return (
              <Text key={key} style={styles.memberImage}>
                {`${prop.username}`}
              </Text>
            );
          })}
        </View>
      );
    }
    return null;
  }

  render() {
    const userID = this.props.navigation.getParam('userID');
    const query = gql`
    {
      user(id: ${userID}){
        email
        groups{
          id
          Group_name
          users{
            username
          }
        }
      }
    }`;

    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location);
      console.log(this.state.location)
    }

    return (
      <Query query={query} pollInterval={50}>
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
            if(Group.id) {
              return(
                <TouchableOpacity onPress={() => {this.onChatPress(Group.id)}}>
                <View style={styles.container} >
                  <View style={styles.content}>
                    <View style={mainContentStyle}>
                      <View style={styles.text}>
                        <Text style={styles.groupName} >{Group.Group_name}</Text>
                      </View>
                      <Text style={styles.countMembers}>
                        {Group.users.length} members
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
            } else {
              return <FlatList></FlatList>
            }
          }}/>
        );
      }}
    </Query>
    );
  }
}


// StyleSheet
const styles = StyleSheet.create({
  root: {
    backgroundColor: "#212121"
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
    marginRight:4,
    borderRadius:10,
    color: '#85e0e0'
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
    color:"#a3a3c2"
  },
  groupName:{
    fontSize:23,
    color:"white"
  },
  groupMembersContent:{
    flexDirection:'row',
    marginTop:10
  }
});