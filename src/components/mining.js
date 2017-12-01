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
            <h1>Mining</h1>
            <svg onClick={this.handleClick} width="400px" height="400px">
                 <filter id="blurMe">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="5"/>
                </filter>
                <g filter="url(#blurMe)"><CircleDesign/></g>
                <g><CircleDesign circlesMiningData={circlesMiningData}/></g>
            </svg>
        </div>
    );
  }
}

export default Mining;
