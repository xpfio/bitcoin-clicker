import React, { Component } from 'react';
import numeral from 'numeral';
let f=k=>numeral(k).format('0.0 a') //format
let g=k=>numeral(k).format('0. a') //format

class elecUpgrade extends Component {
  render() {
    // console.log(this.props)
    return (

      <g transform={"translate(0,"+(30+this.props.index*40)+")"} cursor="pointer">
        <rect x="50" y="0" width="100" height="25" fill="#163e50"/>
        <rect x="147" y="0" width="3" height="25" fill="#0ee33e"/>
        <text x="55" y="10" fill="white" fontSize="8px" textAnchor="left">{this.props.upgrade.name}</text>
        <text x="45" y="15" fill="white" fontSize="10px" textAnchor="end">{g(this.props.upgrade.state.count)} x</text>
        <text x="55" y="20" fill="white" fontSize="6px" textAnchor="left">{f(this.props.upgrade.state.rate)} H/s</text>
        <text x="143" y="20" fill="white" fontSize="6px" fontWeight="bolder" textAnchor="end">{g(this.props.upgrade.state.cost)} USD</text>
      </g>
    );
  }
}

export default elecUpgrade;
