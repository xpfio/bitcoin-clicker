import React, { Component } from 'react';

class Blockchain extends Component {
  render() {
    let styleTitle = {
        position: 'absolute',
        right:50,
        top:15
    }

    let colors=['red','green','yellow','blue','grey','orange','white']
    
    let blockElements = [...Array(30)].map((block,index)=>{
        return (
            <g key={index} transform={ "translate(" + (170+index*70) + ",25)"}>
                <rect x="0" y="0" width="50" height="50" fill="#446688" stroke="none"/>
                <rect filter="url(#blurMe2)" x="0" y="0" width="50" height="50" fill="#446688" stroke="none"/>
                <rect x="10" y="10" width="30" height="10" fill={colors[index%colors.length]} stroke="none"/>
                <rect x="10" y="30" width="10" height="10" fill={colors[(index+1)%colors.length]} stroke="none"/>
            </g>
        );
    })
    return (
        <div>
            <h1 style={styleTitle}>Blockchain</h1>
            <svg width="100%" height="100px">
                 <filter id="blurMe2">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="2"/>
                </filter>

                <rect x="50" y="0" width="100" height="100" fill="#53e1f2" stroke="none"/>
                <g>{blockElements}</g>
                {/* <g  filter="url(#blurMe2)">{blockElements}</g> */}

                <linearGradient id="g660" gradientUnits="userSpaceOnUse" x1="50%" y1="0%" x2="100%" y2="100%">
                    <stop stopOpacity="0.0" stopColor="rgb(10, 10, 10)" offset="0"/>
                    <stop stopOpacity="1" stopColor="rgb(10, 10, 10)" offset="1"/>
                </linearGradient>
                <rect x="0" y="0" width="2000" height="200" fill="url(#g660)" />

            </svg>
        </div>
    );
  }
}

export default Blockchain;
