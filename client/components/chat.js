import React from 'react';
import { Button, View, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'
import * as firebase from 'firebase';
import firebaseConfig from './firebase.js'

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
    state = {
      messages: [],
    }  
    this.addMessage = this.addMessage.bind(this)
  }  

  componentWillMount() {
    this.setState({
      messages: [
      ],
    })
    this.startMessagesListening()
  }

  clickHandler = () => {
    //function to handle click on floating Action Button
    Alert.alert('Floating Button Clicked');
  };

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))

    this.addMessage(messages.slice(-1).pop())
  }
  
  addMessage(message) {
    const props = this.props
    firebase.database().ref('messages/').push({
      createdAt: new Date().getTime(),
      ...message,
      user: {
        avatar: `https://api.adorable.io/avatars/28/${props}.jpg`,
        ...message.user,
      },
    });
  }

  startMessagesListening() {
    firebase.database().ref('messages/').on('value', (snapshot) => {
      const messagesObj = snapshot.val();
      const messages = Object.keys(messagesObj).map(msgKey => messagesObj[msgKey])
      this.setState({
        messages: messages.reverse()
      })
    });
  }

  render() {
    const props = this.props.navigation.getParam('userID')
    return (
      <View style={styles.container}>
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: props,
          }}
        />
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={this.clickHandler}
          style={styles.TouchableOpacityStyle}>
          <Image
            //We are making FAB using TouchableOpacity with an image
            //We are using online image here
//              source={{
// uri:'http://aboutreact.com/wp-content/uploads/2018/08/bc72de57b000a7037294b53d34c2cbd1.png',
//             }}
            //You can use you project image Example below
            source={require('../assets/add-icon.png')}
            style={styles.FloatingButtonStyle}
          />
        </TouchableOpacity>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
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