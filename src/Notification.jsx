import React, { Component } from 'react';

class Notification extends Component {
  render() {
    const received = this.props.content;
    return <span className="message system">{received}</span>;
  }
}

export default Notification;
