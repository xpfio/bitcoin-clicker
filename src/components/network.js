import './network.css';
import React, { Component } from 'react';
import { geoMercator, geoPath } from 'd3-geo'
import worlddata from '../static/world'
import citiesdata from '../static/cities'

class Network extends Component {
  render() {
    const projection = geoMercator()
    const pathGenerator = geoPath().projection(projection)
    const countries = worlddata.features
      .map((d,i) => <path
      key={'path' + i}
      d={pathGenerator(d)}
      className='countries'
/>)

    console.log(citiesdata.cities)
    const cities = citiesdata.cities
      .map((d,i) => <circle
      key={'city-' + i}
      cx={projection([d.lng,d.lat])[0]}
      cy={projection([d.lng,d.lat])[1]}
      r="2" 
      className='city'
      />)
    
    return (
      <div className="network">
        {/* <h1>Network</h1> */}
        <svg width="100%" height="400">
          <filter id="blurMe3">
              <feGaussianBlur in="SourceGraphic" stdDeviation="5"/>
          </filter>
          <g filter="url(#blurMe3)">{countries}</g>
          <g>{countries}</g>

          <g filter="url(#blurMe3)">{cities}</g>
          <g>{cities}</g>

          <rect x="0" y="0" width="90" height="20" fill="#1b3e50"/>
          <text x="45" y="14" fill="white" fontSize="10px" textAnchor="middle">NETWORK</text>
        </svg>
      </div>
    )
  }
}

export default Network;
