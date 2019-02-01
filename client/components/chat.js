import React, {Component} from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { AsyncStorage, Text, StyleSheet, View, ActivityIndicator } from 'react-native'
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

export default class Chat extends Component {
  state = {
    user: 6000,
    messages: []
  }

  async componentDidMount() {
    this._subscribeToNewMessages()
    await this._initUser()
  }

  sendComplete(data) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, data.createMessage.text),
    }))
  }

  render() {
    if (!this.state.user) {
      return (
        <View style={styles.container}>
          <Text>No user found.</Text>
        </View>
      )
    }

    if (this.props.allMessagesQuery.loading) {
      return (
        <View style={styles.container}>
          <Text>Loading messages ...</Text>
          <ActivityIndicator style={styles.loadingIndicator} />
        </View>
      )
    }
    const messages = this.props.allMessagesQuery.messages ? this.props.allMessagesQuery.messages.map(this._convertMessageToGiftedChatFormat) : [] 
    const userID = this.props.navigation.getParam("userID")
    const groupName = this.props.navigation.getParam("groupName")
    console.log(`Render messages: ${JSON.stringify(messages)}`)
    return (
      <Mutation mutation={createMessage} onCompleted={this.sendComplete}>
        {(createMessage, {data}) => (
        <GiftedChat 
          messages={messages}
          onSend={this._onSend}
          user={"Bob"}
          // onSend={messages => createMessage({variables:{userID: userID, Group_name: groupName, text: messages[0].text}})}
          />
        )}
      </Mutation>
    )
  }

_onSend = (messages) => {
  // const message = messages[0]
  // const variables = { text: message.text, sentById: message.user._id }
  this.props.createMessageMutation({variables:{userID: userID, Group_name: groupName, text: messages[0].text}})
}
_subscribeToNewMessages = () => {
  this.createMessageSubscription = this.props.allMessagesQuery.subscribeToMore({
    document: newMessageSubscription,
    updateQuery: (previousState, {subscriptionData}) => {
      const newMessage = subscriptionData.data.Message.node
      const messages = [newMessage].concat(previousState.allMessages)
      return {
        allMessages: messages
      }
    },
    onError: (err) => console.error(err),
  })
}

_convertMessageToGiftedChatFormat = (message) => {
  console.log(message)
  return {
    _id: message.id,
    user: {
      _id: message.user.id,
      name: message.user.username
    },
    text: message.text,
    createdAt: message.created_at
  }
}

}

// const allMessages = gql`
//   query messages {
//     messages() {
//       id
//       text
//       created_at
//     }
//   }
// `

// const newMessageSubscription = gql`
//   subscription Message(filter: {
//       mutation_in: [CREATED]
//     }) {
//       node {
//         id
//         text
//         created_at
//       }
//   }
// `
const createMessage = gql`
   mutation CreateMessage($userid: Int, $Group_name: String,  $text: String) {
    createMessage(userid: $userid, Group_name: $Group_name,  text: $text) {
     id
     text
     created_at
    }
  }
`