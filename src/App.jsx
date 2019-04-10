import React, { Component } from 'react';
import NavBar from './NavBar.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

const generateRandomString = () => {
  return Math.random()
    .toString(36)
    .substring(2, 8);
};

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      currentUser: '',
      messages: []
    };
  }

  handleOnOpen = event => {
    console.log('Client connected');
  };

  handleOnError = event => {
    console.log('Error connecting to websocket');
  };

  handleOnMessage = event => {
    const received = JSON.parse(event.data);
    const oldMessages = this.state.messages;
    console.log(received);
    this.setState({ currentUser: received.username });
    switch (received.type) {
      case 'incomingMessage':
        this.setState({ messages: [...oldMessages, received] });
        break;
      case 'incomingNotification':
        this.setState({ messages: [...oldMessages, received] });
        break;
      default:
        throw new Error('Unknown event type ' + received.type);
    }
  };

  componentDidMount() {
    const url = 'ws://localhost:3001';
    this.socket = new WebSocket(url);
    this.socket.onopen = this.handleOnOpen;
    this.socket.onerror = this.handleOnError;
    this.socket.onmessage = this.handleOnMessage;
  }

  serverSend = (content, user, type) => {
    const operator = {
      content,
      username: user,
      type
    };
    this.socket.send(JSON.stringify(operator));
  };

  render() {
    return (
      <div>
        <NavBar />
        <MessageList messages={this.state.messages} />
        <ChatBar
          currentUser={this.state.currentUser}
          serverSend={this.serverSend}
        />
      </div>
    );
  }
}
export default App;
