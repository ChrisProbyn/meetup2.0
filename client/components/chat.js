import React from 'react';
import { 
  Text,
  View,
  StyleSheet
} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'
import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCukq86r_hmV36tT2Yh7Ro8pvRfKf9-9cI",
  authDomain: "meetup-1548370413886.firebaseapp.com",
  databaseURL: "https://meetup-1548370413886.firebaseio.com",
  projectId: "meetup-1548370413886",
  storageBucket: "meetup-1548370413886.appspot.com",
  messagingSenderId: "711622922838"
};

firebase.initializeApp(firebaseConfig);

export default class Chat extends React.Component {
  constructor(props) {
    super(props)

    state = {
      messages: [],
    }  

    this.addMessage = this.addMessage.bind(this)
    this.startMessagesListening()
  }

  componentWillMount() {
    this.setState({
      messages: [
      ],
    })
  }

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
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});