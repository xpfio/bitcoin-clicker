import React, { Component } from 'react';
import CircleDesign from './miningElements/circlesDesign'
import './mining.css';
import circlesMiningData from '../api/circlesMining';

class Mining extends Component {
  constructor(props) {
    super(props);
    this.state = {clickTotal: 0};
    this.circlesMiningData = circlesMiningData;

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log(this.clickTotal)
    this.setState(prevState => ({
      clickTotal: prevState.clickTotal += 1
    }));
    circlesMiningData['circles'][0].numberOfElementsMissing-=1;
    if(circlesMiningData['circles'][0].numberOfElementsMissing<0){
        circlesMiningData['circles'][0].numberOfElementsMissing=circlesMiningData['circles'][0].numberOfElements;
    }
  }

  render() {
    return (
        <div>
            <svg onClick={this.handleClick} width="400px" height="400px">
                 <filter id="blurMe">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="5"/>
                </filter>
                <g filter="url(#blurMe)"><CircleDesign circlesMiningData={circlesMiningData}/></g>
                <g><CircleDesign circlesMiningData={circlesMiningData}/></g>

                <rect x="0" y="0" width="90" height="20" fill="#1b3e50"/>
                <text x="45" y="14" fill="white" fontSize="10px" textAnchor="middle">MINING</text>
            </svg>
        </div>
    );
  }
}

export default Mining;
