import React, { Component } from 'react';

class Message extends Component {
  render() {
    return (
      <div className="message">
        <span style={{ color: this.props.color }} className="message-username">
          {this.props.username}
        </span>
        <span className="message-content">{this.props.content}</span>
      </div>
    );
  }
}

export default Message;
