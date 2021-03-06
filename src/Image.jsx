import React, { Component } from 'react';

class Image extends Component {
  render() {
    return (
      <div className="message">
        <span style={{ color: this.props.color }} className="message-username">
          {this.props.username}
        </span>
        <span className="message-content">
          <img className="message-image" src={this.props.content} />
        </span>
      </div>
    );
  }
}

export default Image;
