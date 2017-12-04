import './network.css';
import React, { Component } from 'react';
import * as d3 from "d3";
import worlddata from '../static/world'
import citiesdata from '../static/cities'

class Network extends Component {

  componentDidMount() {

    function zoomed() {
      d3.select('#pan-zoom-network').attr("transform", d3.event.transform);
    }

    d3.select('#svg-network').call(d3.zoom()
        .scaleExtent([1 / 2, 4])
        .on("zoom",zoomed)
    )
  }

  render() {
    const projection = d3.geoMercator().scale(200).translate([500,350])
    const pathGenerator = d3.geoPath().projection(projection)
    const countries = worlddata.features
      .map((d,i) => <path
      key={'path' + i}
      d={pathGenerator(d)}
      className='countries'
      />)

    const cities = citiesdata.cities
      .map((d,i) => <circle
      key={'city-' + i}
      cx={projection([d.lng,d.lat])[0]}
      cy={projection([d.lng,d.lat])[1]}
      r="2" 
      className='city'
      />)

    const links = citiesdata.links
      .map((d,i) => <line
      key={'line-' + i}
      x1={projection([d.source.lng,d.source.lat])[0]}
      y1={projection([d.source.lng,d.source.lat])[1]}
      x2={projection([d.target.lng,d.target.lat])[0]}
      y2={projection([d.target.lng,d.target.lat])[1]}
      strokeWidth="0.6"
      stroke="#53e1f2"
      opacity="0.4"
      className='link'
/>)

    return (
      <div className="network">
        {/* <h1>Network</h1> */}
        <svg id="svg-network" width="100%" height="550px">
          <filter id="blurMe3">
              <feGaussianBlur in="SourceGraphic" stdDeviation="5"/>
          </filter>
          <g id="pan-zoom-network">
            <g filter="url(#blurMe3)">{countries}</g>
            <g>{countries}</g>

            <g filter="url(#blurMe3)">{cities}</g>
            <g>{links}</g>
            <g>{cities}</g>
          </g>

          <rect x="0" y="0" width="90" height="20" fill="#1b3e50"/>
          <text x="45" y="14" fill="white" fontSize="10px" textAnchor="middle">NETWORK</text>
        </svg>
      </div>
    )
  }
}

export default Network;
