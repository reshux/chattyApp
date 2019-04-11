import React, { Component } from 'react';
import NavBar from './NavBar.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      onlineCounter: 1,
      currentUser: { name: '', color: '' },
      messages: []
    };
  }

  componentDidMount() {
    const url = 'ws://localhost:3001';
    this.socket = new WebSocket(url);
    // calling our event handler functions to check for changes
    this.socket.onopen = this.handleOnOpen;
    this.socket.onerror = this.handleOnError;
    this.socket.onmessage = this.handleOnMessage;
  }

  // 3 Generic event handlers
  handleOnOpen = event => {
    console.log('Client connected');
  };

  handleOnError = event => {
    console.log('Error connecting to websocket');
  };

  handleOnMessage = event => {
    const received = JSON.parse(event.data);
    // Get the already existing messages from state
    const oldMessages = this.state.messages;
    // switch to manipulate messages according to their types
    switch (received.type) {
      case 'incomingMessage':
      case 'incomingNotification':
      case 'incomingImage':
        // updates messages state with a message or notification
        this.setState({ messages: [...oldMessages, received] });
        break;
      case 'onlineCounter':
        // updates user counter
        this.setState({ onlineCounter: received.number });
        break;
      case 'userColor':
        this.setState({
          currentUser: { ...this.state.currentUser, color: received.color }
        });
        break;
    }
  };

  // a generic function to send data to WebSocket server
  // this function is sent to child component chatBar as a prop
  serverSend = (content, user, type) => {
    const operator = {
      content,
      username: user,
      type,
      color: this.state.currentUser.color
    };
    this.socket.send(JSON.stringify(operator));
  };

  render() {
    const { currentUser, messages, onlineCounter } = this.state;
    return (
      <div>
        <NavBar onlineCounter={onlineCounter} />
        <MessageList messages={messages} />
        <ChatBar currentUser={currentUser} serverSend={this.serverSend} />
      </div>
    );
  }
}
export default App;
