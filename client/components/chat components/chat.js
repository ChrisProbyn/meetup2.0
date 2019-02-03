import React, {Component} from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

export default class Chat extends Component {
  constructor(props){
 this.state = {
   messages: [],
 }
 
}

 componentWillMount() {
   this.setState({
     messages: [
       {
         _id: 1,
         text: 'Hello developer',
         createdAt: new Date(),
         user: {
           _id: 2,
           name: 'React Native',
         },
       },
     ],
   })
 }

 onSend(data, messages=[]) {
   this.setState({
     messages: GiftedChat.append(data.text, messages),
   })
 }

 render() {
   return (
     <Mutation mutation={addMessageMutation} onCompleted={this.onSend}>
       {(createMessage, {data}) => (
       <GiftedChat
         messages={this.state.messages}
         onSend={(data) => this.onSend(data)}
         />
       )}
     </Mutation>
   )
 }
}

const addMessageMutation = gql`
  mutation CreateMessage($username: String, $Group_name: String,  $text: String) {
   createMessage(username: $username, Group_name: $Group_name,  text: $text) {
    id
    text
    created_at
  }
  }`