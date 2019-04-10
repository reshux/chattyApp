import React, { Component } from 'react';

class Notification extends Component {
  render() {
    const received = this.props.content;
    return (
      <div className="message">
        <span className="message system">{received}</span>
      </div>
    );
  }
}

export default Notification;
