import React, { Component } from 'react';
import numeral from 'numeral';
let f=k=>numeral(k).format('0.0 a') //format
let g=k=>numeral(k).format('0. a') //format

class rigUpgrade extends Component {
  render() {
    // console.log(this.props)
    return (

        <g transform={"translate(0,"+(30+this.props.index*40)+")"} cursor="pointer">
            <rect x="0" y="0" width="100" height="25" fill="#1b3e50"/>
            <rect x="97" y="0" width="3" height="25" fill="#53eeee"/>
            <text x="5" y="10" fill="white" fontSize="8px" textAnchor="left">{this.props.upgrade.name}</text>
            <text x="105" y="15" fill="white" fontSize="10px" textAnchor="left">x {g(this.props.upgrade.state.count)}</text>
            <text x="5" y="20" fill="white" fontSize="6px" textAnchor="left">{f(this.props.upgrade.state.rate)} H/s</text>
            <text x="93" y="20" fill="white" fontSize="6px" fontWeight="bolder" textAnchor="end">{g(this.props.upgrade.state.cost)} USD</text>
        </g>
    );
  }
}

export default rigUpgrade;
