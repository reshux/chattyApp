import React, { Component } from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';
import Image from './Image.jsx';

class MessageList extends Component {
  render() {
    // receive the messages as a prop. map them to a new array
    // check their types and return them as an HTML element to render
    // I prefered to create a seperate Notification component
    const received = this.props.messages.map(msg => {
      if (msg.type === 'incomingMessage') {
        return (
          <Message
            content={msg.content}
            color={msg.color}
            username={msg.username}
            key={msg.id}
          />
        );
      } else if (msg.type === 'incomingNotification') {
        return (
          <Notification
            content={msg.content}
            key={msg.id}
            username={msg.username}
          />
        );
      } else if (msg.type === 'incomingImage' || msg.type === 'incomingGif') {
        return (
          <Image
            content={msg.content}
            color={msg.color}
            username={msg.username}
            key={msg.id}
          />
        );
      }
    });
    return (
      <div id="container">
        <main id="main" className="messages">
          {received}
        </main>
      </div>
    );
  }
}

export default MessageList;
