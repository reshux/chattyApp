import React, { Component } from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputChecker: '',
      userChecker: 'Anonymous'
    };
  }

  //// Checker function that returns a boolean for image URL

  isImageURL = str => {
    const tester = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g;
    return tester.test(str);
  };

  //// Handler and helper function for a username change

  handleChange = event => {
    this.setState({ userChecker: event.target.value });
  };

  onPressEnterUser = event => {
    if (event.key === 'Enter') {
      const newUsername = event.target.value;
      event.preventDefault();
      const oldName = this.state.userChecker;
      this.setState({ userChecker: newUsername });
      this.props.serverSend(
        `${oldName} has changed their username to ${event.target.value}.`,
        this.state.userChecker,
        'postNotification'
      );
    }
  };

  //// Handler and helper function for a new message

  handleChangeMessage = event => {
    this.setState({ inputChecker: event.target.value });
  };

  onPressEnterMessage = event => {
    // event listener that checks for an Enter key press
    if (event.key === 'Enter') {
      event.preventDefault();
      if (this.state.inputChecker.length > 0) {
        if (this.isImageURL(this.state.inputChecker)) {
          this.props.serverSend(
            this.state.inputChecker,
            this.state.userChecker,
            'postImage'
          );
        } else {
          this.props.serverSend(
            this.state.inputChecker,
            this.state.userChecker,
            'postMessage'
          );
          this.setState({ inputChecker: '' });
        }
      }
    }
  };

  render() {
    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          placeholder="Your Name (Optional)"
          onKeyUp={this.onPressEnterUser}
          onChange={this.handleChangeUser}
        />
        <input
          className="chatbar-username"
          placeholder="Type a message and hit ENTER"
          value={this.state.inputChecker}
          onKeyUp={this.onPressEnterMessage}
          onChange={this.handleChangeMessage}
        />
      </footer>
    );
  }
}

export default ChatBar;
