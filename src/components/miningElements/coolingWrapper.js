import React, { Component } from 'react';
import CoolingUpgradeElement from './coolingUpgrade'

class CoolingWrapper extends Component {
  constructor(props) {
    super(props);
    this.handleClickBuy = this.handleClickBuy.bind(this);
  }

  handleClickBuy(d,k){
      this.props.handleClickBuy(d,k); //Bubbling
  }
  render() {

    let coolingUpdates = [];

    if(this.props.CoolingUpgrade){
        console.log(this.props.CoolingUpgrade);
        coolingUpdates = this.props.CoolingUpgrade
                                    .filter(d=>2*this.props.maxCash>=d.state.cost)
                                    .map((d,p)=>(
                                        <g key={'cooling-wrap'+p} onClick={(k)=>this.handleClickBuy(d,k)} opacity={this.props.cash>=d.state.cost?1:0.2}>
                                            <CoolingUpgradeElement index={p} upgrade={d}/>
                                        </g>))
    }

    return (
        <svg className="miningRight" width="150px" height="400px">
            <line x1="1" y1="1" x2="150" y2="1" stroke="white" strokeWidth="1"/>
            <text x="150" y="15" fill="white" fontSize="10px" textAnchor="end">COOLING</text>
            {coolingUpdates}
        </svg>
    )
  }

}

export default CoolingWrapper;