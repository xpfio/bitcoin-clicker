import React, { Component } from 'react';

import {polarToCartesian} from '../helpers/arcs';
import {describeArc} from '../helpers/arcs';

import circleImage from '../images/circles.png';
import circlesMiningData from '../api/circlesMining'

class Mining extends Component {
  render() {
    let circleBackground = {
        position:"absolute",
        top:26,
        opacity:0.2,
        zIndex:-99
    };

    console.log(circlesMiningData);
    let circlesElement = circlesMiningData['circles'].map((circle,index)=>{
        let n = circle.numberOfElements;
        n -= circle.numberOfElementsMissing?circle.numberOfElementsMissing:0;
        return (
            <g key={index}>
                {
                    [...Array(n)].map((d,p)=>
                        <path id={circle.id+'-'+p} 
                            key={circle.id+'-'+p} 
                            fill={circle.fill} 
                            stroke={circle.stroke} 
                            strokeWidth={circle.strokeWidth} 
                            opacity={circle.opacity} 
                            d={describeArc( 
                                200,
                                200,
                                circle.r,
                                circle.startAngle + p*360/circle.numberOfElements,
                                circle.startAngle + p*360/circle.numberOfElements + (360/circle.numberOfElements-circle.spaceBetweenElements))}
                        >
                        </path>
                    )
                }
            {circle.rotationSpeed &&
                <animateTransform attributeType="xml"
                    attributeName="transform"
                    type="rotate"
                        from="0 200 200" 
                        to={circle.rotationDirection == -1?"-360 200 200":"360 200 200"}
                    dur={circle.rotationSpeed}
                    repeatCount="indefinite"/>
            }
            </g>
        )
    })

    return (
        <div>
            <p>Hello!</p>
            <img src={circleImage} alt="Background Circles" style={circleBackground}/>
            <svg width="400px" height="400px">
                 <filter id="blurMe">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="5"/>
                </filter>
                <g filter="url(#blurMe)">{circlesElement}</g>
                <g>{circlesElement}</g>
            </svg>
        </div>
    );
  }
}

export default Mining;
