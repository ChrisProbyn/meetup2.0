import React, {Component} from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const SEND_MESSAGE_MUTATION = gql`
   mutation CreateMessage($userid: Int, $Group_name: String,  $text: String) {
    createMessage(userid: $userid, Group_name: $Group_name,  text: $text) {
     id
     text
     created_at
    }
  }
`;

const MESSAGE_SENT_SUBSCRIPTION = gql`
  subscription MessageAdded($groupIds: ID!){
    messageAdded(groupIds: $groupIds){
      id
      text
      created_at
    }
  }
`;

const CHATS_QUERY = gql`
  query messages {
    Message {
      id
      text
      created_at
    }
  }
`;


export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {messages: []};
  }

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
          user: {
            _id: 2,
            username: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    });
  }
  onSend(messages = []) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });
  }
 
  render() {
    const userID = this.props.navigation.getParam("userID")
    const groupName = this.props.navigation.getParam("groupName")
    return (
      <Mutation mutation={SEND_MESSAGE_MUTATION} onCompleted={this.sendComplete}>
        {(createMessage, {data}) => (
          <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        />
        )}
      </Mutation>
    )
  }
}