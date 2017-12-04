import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
            <svg width="285" height="80">
              <rect x="0" y="20" width="50" height="50" fill="grey"/>
              <text x="25" y="50" fill="white" textAnchor="middle">V1</text>
              <rect x="70" y="20" width="50" height="50" fill="grey"/>
              <text x="95" y="50" fill="white" textAnchor="middle">STA</text>
              <rect x="140" y="20" width="50" height="50" fill="grey"/>
              <text x="165" y="50" fill="white" textAnchor="middle">ACH</text>
              <rect x="210" y="20" width="50" height="50" fill="grey"/>
              <text x="235" y="50" fill="white" textAnchor="middle">SOC</text>
            </svg>
    )
  }
}

export default Header;
