import React, { Component } from 'react';

import RigUpgradeElement from './rigUpgrade'

class RigWrapper extends Component {
  constructor(props) {
    super(props);
    this.handleClickBuy = this.handleClickBuy.bind(this);
  }

  handleClickBuy(d,k){
      this.props.handleClickBuy(d,k); //Bubbling
  }
  render() {

    let rigUpdates = [];
    if(this.props.miningRigUpdates){
        rigUpdates = this.props.miningRigUpdates
                                    .filter(d=>2*this.props.maxCash>=d.state.cost)
                                    .map((d,p)=>(
                                        <g key={'rig-wrap'+p} onClick={(k)=>this.handleClickBuy(d,k)} opacity={this.props.cash>=d.state.cost?1:0.2}>
                                            <RigUpgradeElement index={p} upgrade={d}/>
                                        </g>))
    }

    return (
        <svg className="miningLeft" width="150px" height="400px">
            <line x1="0" y1="1" x2="150" y2="1" stroke="white" strokeWidth="1"/>
            <text x="0" y="15" fill="white" fontSize="10px">MINING RIG</text>
            {rigUpdates}
        </svg>
    )
  }

}

export default RigWrapper;