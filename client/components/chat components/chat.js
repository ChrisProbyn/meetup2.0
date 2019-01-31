import React, {Component} from 'react';
import { GiftedChat } from 'react-native-gifted-chat';

export default class Chat extends Component {
  constructor(props){
  super(props)
  state = {
    messages: [],
  }
}
  AddMessage = ({ mutate }) => {
  const handleKeyUp = (evt) => {
    if (evt.keyCode === 13) {
      evt.persist();
      mutate({ 
        variables: { name: evt.target.value }
      })
      .then( res => {
        evt.target.value = '';  
      });
    }
  };
  return (
    <input
      type="text"
      placeholder="New channel"
      onKeyUp={handleKeyUp}
    />
  );
};

addMessageMutation = gql`
  mutation addChannel($name: String!) {
    addChannel(name: $name) {
      id
      name
    }
  }
`;

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
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    })
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  render() {
    const AddChannel = ({ mutate }) => {
      const handleKeyUp = (evt) => {
        if (evt.keyCode === 13) {
          evt.persist();
          mutate({ 
            variables: { name: evt.target.value }
          })
          .then( res => {
            evt.target.value = '';  
          });
        }
      };
      return (
        <input
          type="text"
          placeholder="New channel"
          onKeyUp={handleKeyUp}
        />
      );
    };
    return (
      <GiftedChat 
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    )
  }
}