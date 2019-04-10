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
      onlineCounter: 1,
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
    console.log(received);
    const oldMessages = this.state.messages;
    this.setState({ currentUser: received.username });
    this.setState({ onlineCounter: received.counter });
    switch (received.type) {
      case 'incomingMessage':
        this.setState({ messages: [...oldMessages, received] });
        break;
      case 'incomingNotification':
        this.setState({ messages: [...oldMessages, received] });
        break;
      case 'onlineCounter':
        this.setState({ onlineCounter: received.number });
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
        <NavBar onlineCounter={this.state.onlineCounter} />
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
