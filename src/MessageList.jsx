import React, { Component } from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';

class MessageList extends Component {
  render() {
    const received = this.props.messages.map(msg => {
      if (msg.type === 'incomingMessage') {
        return (
          <Message content={msg.content} username={msg.username} key={msg.id} />
        );
      } else if (msg.type === 'incomingNotification') {
        return <Notification content={msg.content} />;
      }
    });
    return <main className="messages">{received}</main>;
  }
}

export default MessageList;
