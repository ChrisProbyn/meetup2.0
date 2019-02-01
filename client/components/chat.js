import React, {Component} from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { AsyncStorage, Text, StyleSheet, View, ActivityIndicator } from 'react-native'
import gql from "graphql-tag";
import { Mutation, compose } from "react-apollo";

export default class Chat extends Component {
  state = {
    messages: [],
  }

  // componentWillMount() {
  //   this.setState({
  //     messages: [
  //       {
  //         _id: 1,
  //         text: 'Hello developer',
  //         createdAt: new Date(),
  //         user: {
  //           _id: 2,
  //           name: 'React Native',
  //         },
  //       },
  //     ],
  //   })
  // }

  sendComplete(data) {
    console.log(data.createMessage.text)
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  render() { 
    const userID = this.props.navigation.getParam("userID")
    const groupName = this.props.navigation.getParam("groupName")
    return (
      <Mutation mutation={createMessage} onCompleted={this.sendComplete}>
        {(createMessage, {data}) => (
        <GiftedChat 
          // messages={data}
          onSend={messages => createMessage({variables:{userID: userID, Group_name: groupName, text: messages[0].text}})}
          />
        )}
      </Mutation>
    )
  }
}

const allMessages = gql`
  query allMessages {
    allMessages(last: 50, orderBy: created_at_DESC) {
      id
      text
      created_at
    }
  }
`

const newMessageSubscription = gql`
  subscription {
    Message(filter: {
      mutation_in: [CREATED]
    }) {
      node {
        id
        text
        created_at
      }
    }
  }
`

const createMessage = gql`
   mutation CreateMessage($userid: Int, $Group_name: String,  $text: String) {
    createMessage(userid: $userid, Group_name: $Group_name,  text: $text) {
     id
     text
     created_at
    }
  }
`