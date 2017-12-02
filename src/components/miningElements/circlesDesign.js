
import React, { Component } from 'react';

import {describeArc} from '../../helpers/arcs';


class CircleDesign extends Component {
  render() {

    let circlesElement = '';
    if(this.props.circlesMiningData){
        circlesElement = this.props.circlesMiningData.map((circle,index)=>{
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
                                188,
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
                        from="0 188 200" 
                        to={circle.rotationDirection === -1?"-360 188 200":"360 188 200"}
                    dur={circle.rotationSpeed}
                    repeatCount="indefinite"/>
            }
            </g>
            )
        })
    }

    return (
        <g>{circlesElement}</g>
    );
  }
}

export default CircleDesign;
