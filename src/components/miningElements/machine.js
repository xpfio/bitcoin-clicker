import React, { Component } from 'react';
import numeral from 'numeral';

import CircleDesign from './circlesDesign';

class Machine extends Component {

    handleClick = d=> this.props.handleClick(d)

    render() {

        let styleSvg = {
        cursor:"pointer"
        };

        let circlesToRender = [];
        if(this.props.circlesMachineMining){
            circlesToRender = this.props.circlesMachineMining.slice(0,3+Math.floor(Math.log(1+this.props.hashRate)));
        }
        return (

            <svg id="clicker" className="miningCenter" onClick={this.handleClick} width="375px" height="400px" style={styleSvg}>
                <filter id="blurMe">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="5"/>
                </filter>

                <circle cx="188" cy="200" r="150" fill="rgb(20,20,20)"/>
                <g filter="url(#blurMe)"><CircleDesign circlesMiningData={circlesToRender}/></g>
                <g><CircleDesign circlesMiningData={circlesToRender}/></g>

                <rect x="138" y="360" width="100" height="20" fill="#1b3e50"/>
                <text x="188" y="374" fill="white" fontSize="10px" textAnchor="middle">MINING</text>

                <text x="75" y="50" fill="white" fontSize="13px" textAnchor="middle">{numeral(this.props.hashRate).format('0.00a')} H/s</text>
                <line x1="20" y1="60" x2="130" y2="60" strokeWidth="1" stroke="white"></line>
                <line x1="130" y1="60" x2="150" y2="80" strokeWidth="1" stroke="white"></line>

                <text x="300" y="50" fill="white" fontSize="13px" textAnchor="middle">{numeral(this.props.temperature).format('0.00a')} °C</text>
                <line x1="355" y1="60" x2="245" y2="60" strokeWidth="1" stroke="white"></line>
                <line x1="245" y1="60" x2="230" y2="75" strokeWidth="1" stroke="white"></line>
            </svg>
        )
  }

}

export default Machine;