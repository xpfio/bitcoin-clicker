import React, { Component } from 'react';
import CircleDesign from './miningElements/circlesDesign'
import './mining.css';
import RigUpgradeElement from './miningElements/rigUpgrade';
import ElecUpgradeElement from './miningElements/elecUpgrade';
import CoolingUpgradeElement from './miningElements/coolingUpgrade';

import circlesMiningData from '../api/circlesMining';

import miningRigUpdates from '../api/miningRigUpdates2';
import ElecUpgrade from '../api/electricityUpgrades';
import CoolingUpgrade from '../api/coolingUpgrades';

import HashRepresentation from './miningElements/hashRepresentation'

class Mining extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clickTotal: 0,
      hash: "3d7659fe0f5368e2711004cb7db92a7940802b8d4d18351d7114a36a875f5acc",
      hashRate: 1,
      cash: 0,
      circlesMachineMining: circlesMiningData,
      miningRigUpdates: miningRigUpdates,
      setIntervalId: 0
    };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
    this.setIntervalHash = this.setIntervalHash.bind(this);
    this.changeHash = this.changeHash.bind(this);
  }

  setIntervalHash(){
    this.setState(prev=>{
      let id = prev.setIntervalId;
      clearInterval(id);
      id = setInterval(()=>{

        this.setState(()=>{
          this.changeHash();
          let tmp = this.state.circlesMachineMining;
          tmp[1].numberOfElementsMissing-=1;
          if(tmp[1].numberOfElementsMissing<0){
              tmp[1].numberOfElementsMissing=tmp[1].numberOfElements-1;
          }
            return {circlesMachineMining:tmp}
        })

      },1000/Math.log(2+prev.hashRate))
      return {setIntervalId:id}
    })
  }

  changeHash(){
    let prob = ['0','0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f']; // Double 0 proba... hardcoded
    this.setState(() => ({
      hash: [...Array(64)].map(d=>prob[Math.floor(Math.random()*prob.length)]).join('')
    }));
  }

  handleClickBuy(d) {
    console.log(d)
    if(d.state.cost<=this.state.cash){
      console.log(d.state.cost)
      console.log(this.state.cash)
      this.setState((prevState)=>{
        let currentRate = d.state.rate;
        let currentCost = d.state.cost;
        let tmp = prevState.miningRigUpdates.filter(rig=>rig.key==d.key)[0];
        tmp.state.cost*=d.cost_increase;
        tmp.state.count+=1;

        return {
        hashRate : prevState.hashRate + currentRate,
        cash : prevState.cash - currentCost,
        miningRigUpdates: prevState.miningRigUpdates
      }},this.setIntervalHash);

    }
  }



  handleClick() {
    this.setState(prevState => ({
      clickTotal: prevState.clickTotal += 1,
      hashRate: prevState.hashRate+1,
      cash: prevState.cash+1
    }));

    this.setState(()=>{
      let tmp = this.state.circlesMachineMining;
      tmp[0].numberOfElementsMissing-=1;
      if(tmp[0].numberOfElementsMissing<0){
          tmp[0].numberOfElementsMissing=tmp[0].numberOfElements-1;
      }
        this.changeHash();
        return {circlesMachineMining:tmp}
    })
  }

  render() {
    let styleSvg = {
      cursor:"pointer"
    };

    let borderTitlesStyle = {
      border: "1px rgb(200,200,200) solid",
      borderWidth: "1px 0px 1px 0px"
    }

    let rigUpdates = this.state.miningRigUpdates.filter(d=>2*this.state.cash>=d.state.cost).map((d,p)=><g onClick={(k)=>this.handleClickBuy(d,k)}><RigUpgradeElement index={p} upgrade={d}/></g>)
    let elecUpdates = ElecUpgrade.filter(d=>2*this.state.cash>=d.state.cost).map((d,p)=><ElecUpgradeElement index={p} upgrade={d}/>)
    let coolingUpdates = CoolingUpgrade.filter(d=>2*this.state.cash>=d.state.cost).map((d,p)=><CoolingUpgradeElement index={p} upgrade={d}/>)

    return (
        <div>

              <svg className="miningLeft" width="100%" height="120px">
                <line x1="90" y1="0" x2="90" y2="115" stroke="white" strokeWidth="1"/>
                
                <text x="80" y="11" fill="white" textAnchor="end" fontSize="10px">CURRENT</text>
                <text x="100" y="12" fill="white" fontFamily="courier" textAnchor="left" fontSize="15px">{"0x"+this.state.hash}</text>
                <g transform="translate(120,20)"><HashRepresentation hash={this.state.hash}/></g>
                
                <text x="80" y="74" fill="white" textAnchor="end" fontSize="10px">TARGET</text>
                <text x="100" y="75" fill="white" fontFamily="courier" textAnchor="left" fontSize="15px">0x00000000000000000ffff0000000000000000000000000000000000000000000</text>
                <g transform="translate(120,80)"><HashRepresentation hash="00000000000000000ffff0000000000000000000000000000000000000000000"/></g>
              </svg>  
            <svg className="miningLeft" width="150px" height="400px">
              <line x1="0" y1="1" x2="150" y2="1" stroke="white" strokeWidth="1"/>
              <text x="0" y="15" fill="white" fontSize="10px">MINING RIG</text>

              {rigUpdates}
            </svg>

            <svg className="miningCenter" onClick={this.handleClick} width="375px" height="400px" style={styleSvg}>
                 <filter id="blurMe">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="5"/>
                </filter>

                <g filter="url(#blurMe)"><CircleDesign circlesMiningData={this.state.circlesMachineMining.slice(0,2+Math.floor(Math.log(1+this.state.hashRate)))}/></g>
                <g><CircleDesign circlesMiningData={this.state.circlesMachineMining.slice(0,2+Math.floor(Math.log(1+this.state.hashRate)))}/></g>

                <rect x="138" y="360" width="100" height="20" fill="#1b3e50"/>
                <text x="188" y="374" fill="white" fontSize="10px" textAnchor="middle">MINING</text>

                <text x="75" y="50" fill="white" fontSize="13px" textAnchor="middle">{this.state.hashRate} H/s</text>
                <line x1="20" y1="60" x2="130" y2="60" strokeWidth="1" stroke="white"></line>
                <line x1="130" y1="60" x2="150" y2="80" strokeWidth="1" stroke="white"></line>

                <text x="300" y="50" fill="white" fontSize="13px" textAnchor="middle">{this.state.cash} °C</text>
                <line x1="355" y1="60" x2="245" y2="60" strokeWidth="1" stroke="white"></line>
                <line x1="245" y1="60" x2="230" y2="75" strokeWidth="1" stroke="white"></line>
            </svg>

            <svg className="miningRight" width="150px" height="400px">
              <line x1="1" y1="1" x2="150" y2="1" stroke="white" strokeWidth="1"/>
              <text x="150" y="15" fill="white" fontSize="10px" textAnchor="end">ENERGY</text>
              {elecUpdates}

              <line x1="1" y1="201" x2="150" y2="201" stroke="white" strokeWidth="1"/>
              <text x="150" y="215" fill="white" fontSize="10px" textAnchor="end">COOLING</text>
              {coolingUpdates}

            </svg>
        </div>
    );
  }
}

export default Mining;
