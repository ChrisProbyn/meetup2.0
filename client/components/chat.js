import React from 'react';
import { 
  Text,
  View,
  StyleSheet
} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'
import * as firebase from 'firebase';
import firebaseConfig from './firebase.js'

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