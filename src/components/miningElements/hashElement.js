import React, { Component } from 'react';
import HashRepresentation from './hashRepresentation';

import FadeImg from '../../images/fade.png'

class hashElement extends Component {

  render() {

    let FadeImgStyle = {
      position: 'absolute',
      'right':0,
      'top':0
    };

    let difficulty = this.props.difficulty;
    let difficulty_hash = '0'.repeat(difficulty) + 'f'.repeat(4) + '0'.repeat(64-4-difficulty)

    return (
        <div>
            <img src={FadeImg} alt="" className="visible-xs" style={FadeImgStyle}/>
            <svg className="miningUp" width="700px" height="120px">
                <line x1="90" y1="0" x2="90" y2="115" stroke="white" strokeWidth="1"/>
                
                <text x="80" y="11" fill="white" textAnchor="end" fontSize="10px">CURRENT</text>
                <text x="100" y="12" fill="white" fontFamily="courier" textAnchor="left" fontSize="15px">{"0x"+this.props.hash}</text>
                <g transform="translate(120,20)"><HashRepresentation hash={this.props.hash}/></g>
                
                <text x="80" y="74" fill="white" textAnchor="end" fontSize="10px">TARGET</text>
                <text x="100" y="75" fill="white" fontFamily="courier" textAnchor="left" fontSize="15px">{'0x'+difficulty_hash}</text>
                <g transform="translate(120,80)"><HashRepresentation hash={difficulty_hash}/></g>

                {this.props.blockFound &&
                <g id="blockFound">
                  <rect x="117" y="77" width="580" height="41" fill="rgb(0,140,10)" opacity="0.7"/>
                  <text x="130" y="102" fill="white" fontSize="14px">BLOCK FOUND</text>
                </g>
                }
            </svg> 
        </div>
    );
  }
}

export default hashElement;
