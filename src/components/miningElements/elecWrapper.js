import React, { Component } from 'react';
import ElecUpgradeElement from './elecUpgrade'

class ElecWrapper extends Component {
  constructor(props) {
    super(props);
    this.handleClickBuy = this.handleClickBuy.bind(this);
  }

  handleClickBuy(d,k){
      this.props.handleClickBuy(d,k); //Bubbling
  }
  render() {

    let elecUpdates = []

    if(this.props.ElecUpgrade){
        elecUpdates = this.props.ElecUpgrade
                                    .filter(d=>2*this.props.maxCash>=d.state.cost)
                                    .map((d,p)=>(
                                        <g key={'elec-wrap'+p} onClick={(k)=>this.handleClickBuy(d,k)} opacity={this.props.cash>=d.state.cost?1:0.2}>
                                            <ElecUpgradeElement index={p} upgrade={d}/>
                                        </g>))
    }

    return (
        <svg className="miningRight" width="150px" height="200px">
            <line x1="1" y1="1" x2="150" y2="1" stroke="white" strokeWidth="1"/>
            <text x="150" y="15" fill="white" fontSize="10px" textAnchor="end">ENERGY</text>
            {elecUpdates}
        </svg>
    )
  }

}

export default ElecWrapper;