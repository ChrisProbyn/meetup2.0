import React from 'react';
import { Button, View, StyleSheet,Text, Image, TouchableOpacity, Alert, Modal , TextInput} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'
import * as firebase from 'firebase';
import firebaseConfig from './firebase.js'
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import ApolloClient from "apollo-boost"

const apolloClient = new ApolloClient({
  uri: "http://192.168.88.68:4000/graphql"
 });


firebase.initializeApp(firebaseConfig);

export default class Chat extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Chat',
      headerRight: (
        <Button
          onPress={() => {
            const userID = navigation.getParam('userID');
            navigation.navigate('Map', {userID: userID})
          }}
          title="Map"
          color="orange"
        />
      ),
    }
  };

  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      modalVisible: false,
      userEmail: ""
    }  
    this.addMessage = this.addMessage.bind(this)
  }  

  componentDidMount() {
    this.startMessagesListening()
  }
  onChangeText = userEmail => this.setState({ userEmail }); 

  clickHandler = () => {
    //function to handle click on floating Action Button
    this.setState({modalVisible: true});
  };

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))

    this.addMessage(messages.slice(-1).pop())
  }
  
  addMessage(message) {
    const userID = this.props.navigation.getParam('userID')
    const groupID = this.props.navigation.getParam('groupID')
    firebase.database().ref('messages/' + groupID).push({
      createdAt: new Date().getTime(),
      ...message,
      user: {
        avatar: `https://api.adorable.io/avatars/28/${userID}.jpg`,
        ...message.user,
      },
    });
  }
  startMessagesListening() {
    const groupID = this.props.navigation.getParam('groupID')
    firebase.database().ref('messages/' + groupID).on('value', (snapshot) => {
      const messagesObj = snapshot.val();
      
      if(!messagesObj){
        // firebase.database().ref('messages/' + groupID).push({});
        this.setState({
          messages: []
        })
      } else{
        const messages = Object.keys(messagesObj).map(msgKey => messagesObj[msgKey])
        this.setState({
          messages: messages.reverse()
        })
      }
    });
  }
  validateEmail(email){
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
    };



  render() {
    
    const groupID = this.props.navigation.getParam('groupID');
    const query = gql`
    {
      users{
        id
        email
      }
      group(id: ${groupID}){
        users{
          email
        }
      }
     }`
     
    addNewUser = (data) => {
      const allUsers = data.users;
      const usersInGroup = data.group.users;
      const email = this.state.userEmail;
      let emailNotInGroup = true;
      let emailInDB = false;
      if(this.validateEmail(email)){
        for(let user of usersInGroup){
          if(user.email === email){
            emailNotInGroup = false;
            Alert.alert(
              'user is allready in group',
              'idiot',
              [
                
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ],
              {cancelable: false},
            )
          }
        }
        for(let user of allUsers) {
          if(user.email === email){
            emailInDB = true;
          }
        }
        if(emailInDB && emailNotInGroup){
          apolloClient.mutate({
            variables: { groupID: groupID, email: email},
            mutation: gql`
              mutation addUserToGroup($groupID: ID, $email: String) {
                addUserToGroup(groupID: $groupID, email: $email) {
                  id
                  group_id
                  user_id
                } 
              }
            `,
          })
          .then(result => {this.setState({modalVisible:false})})
          .catch(error => { console.log(error) });
          this.setState({modalVisible:false})
          }
      } else{
        Alert.alert(
          'email is not valid',
          'email is not valid',
          [
            
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          {cancelable: false},
        )
      }
    }
    const props = this.props.navigation.getParam('userID')
    const userID = this.props.navigation.getParam('userID')

    return (
      <View style={styles.container}>
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: userID,
          }}
        />
      <Query query={query} >
      {({loading, error, data}) => {
        if(loading) return <Text>Loading Container...</Text>;
        if(error) return <Text>Group Component ERROR! {error}</Text>;
        return (
         <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          presentationStyle={"overFullScreen"}
          >
          
            <View style={styles.Modalcontainer}>
              <Text style={styles.title}>Add your friends email:</Text>
              <TextInput
                onChangeText={this.onChangeText}
                style={styles.nameInput}
                placeHolder="User"
              />
              <TouchableOpacity >
                <Button title="Add"
                  onPress={() => addNewUser(data)}/>
              </TouchableOpacity>
            </View>

        </Modal>
        )}}
        </Query>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={this.clickHandler}
          style={styles.TouchableOpacityStyle}>
          <Image
            source={require('../assets/add-icon.png')}
            style={styles.FloatingButtonStyle}
          />
        </TouchableOpacity>
       
      </View>
    )
  }
}
const offset = 24;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#242f3e"
  },
  Modalcontainer: {
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
  TouchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 15,
    top: 30,
  },
 
  FloatingButtonStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
  },
});