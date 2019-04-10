import React, { Component } from 'react';

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">
          Chatty
        </a>
        <span className="navbar-counter">
          {this.props.onlineCounter} user(s) online
        </span>
      </nav>
    );
  }
}

export default NavBar;
