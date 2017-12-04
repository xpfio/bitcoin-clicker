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

    const projection = d3.geoMercator().scale(150).translate([350,300])
    const pathGenerator = d3.geoPath().projection(projection)
    // console.log(citiesdata.links)
    this.links = d3.select('#svg-network-links')
      .selectAll('.link')
      .data(citiesdata.links)
      .enter()
      .append('line')
      .attr('x1',d=>projection([d.source.lng,d.source.lat])[0])
      .attr('y1',d=>projection([d.source.lng,d.source.lat])[1])
      .attr('x2',d=>projection([d.target.lng,d.target.lat])[0])
      .attr('y2',d=>projection([d.target.lng,d.target.lat])[1])
      .attr('stroke-width',0.6)
      .attr('stroke',"#53e1f2")
      .attr('opacity',0.4)
      .attr('class','link')
      .attr('id',(d,p)=>'link-'+0)

    this.links.filter(d=>d.source.name==='Paris').attr('id','link-1')

    this.transition_city()
    this.updateNetwork()

  }

  transition_city = () =>{
    var transitions = 0;
    d3.selectAll('.city')
      .transition().duration(()=>1000*Math.random()).attr('r',4)
      .transition().duration(1000).attr('r',2)
      .on('start',()=>transitions++)
      .on('end',()=>{if(--transitions===0){
        // this.transition_city()
      }})
  }

  triggerUpdateNetwork = (city_to_start_from) => {
    console.log('BB')
    d3.selectAll(".link").attr('id','link-0');
    d3.selectAll(".link").filter(d=>d.source.name===city_to_start_from).attr('id','link-1');
    this.updateNetwork();
  }

  updateNetwork = () => {
    console.log('SDJHSDJH')
    var transitions = 0;
    d3.selectAll('#link-1')
      .attr('id','link-2')
      .transition().duration(200).attr('stroke-width',4)
      .transition().duration(200).attr('stroke-width',0.6)
      .on('start',()=>transitions++)
      .on('end',d=>{
        d.status = d.status+1;
        // console.log(d)
        d3.selectAll('#link-0')
          .filter(a=>a.source.name===d.target.name || a.target.name===d.target.name)
          .attr('id','link-1')
          if(--transitions===0){this.updateNetwork()};
      })
  }

  render() {
    const projection = d3.geoMercator().scale(150).translate([350,300])
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
      fill={d.name=='Paris'?'#53e1f2':'white'}
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
        <svg id="svg-network" width="100%" height="450px">
          <filter id="blurMe3">
              <feGaussianBlur in="SourceGraphic" stdDeviation="5"/>
          </filter>
          <g id="pan-zoom-network">
             {/* <g filter="url(#blurMe3)">{countries}</g> */}
             <g>{countries}</g>  

            {/* <g filter="url(#blurMe3)">{cities}</g> */}
            {/* <g>{links}</g> */}
            <g id="svg-network-links"></g>
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
