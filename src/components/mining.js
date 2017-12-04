import React, { Component } from 'react';

import Machine from './miningElements/machine';
import HashElement from './miningElements/hashElement';
import RigWrapper from './miningElements/rigWrapper';
import ElecWrapper from './miningElements/elecWrapper';
import CoolingWrapper from './miningElements/coolingWrapper';

import {getNewRandomHash, getHashAnswer} from '../helpers/hashTools';

import circlesMiningData from '../api/circlesMining';
import miningRigUpdates from '../api/miningRigUpdates2';
import ElecUpgrade from '../api/electricityUpgrades';
import CoolingUpgrade from '../api/coolingUpgrades';

class Mining extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clickTotal: 0,
      hash: "0000000000000000000000000000000000000000000000000000000000000000",
      hashRate: 0,
      cash: 0,
      circlesMachineMining: circlesMiningData,
      miningRigUpdates: miningRigUpdates,
      setIntervalId:0,
      maxCash:0,
      difficulty:6,
      blockFound:true,
      temperature:0
    };
  }

  componentDidMount = () => {
    // Add hash Rate
    setInterval(() => {
      this.setState(prevState=>({
        cash:prevState.cash+(prevState.hashRate)/100,
        maxCash: Math.max(prevState.maxCash,prevState.cash+(prevState.hashRate)/100),
        temperature:prevState.temperature+Math.log(1+prevState.hashRate/100)
      }))
    },500)

    // Increase Difficulty
    setInterval(() => {
      this.setState(prevState=>({
        difficulty:Math.min(60,Math.floor(6+Math.log(1+prevState.hashRate)))
      }))
    },20000)
  }

  componentDidUpdate = () => {
    console.log('UPDATED')
  }

  newIntervalUpdates = (hash) => {
    // Update Rendering Hashing
    console.log('TET')
    clearInterval(this.state.setIntervalId);
    if(hash==0){
      return true;
    }
    this.state.setIntervalId = setInterval(()=>{
                                    this.changeHash();
                                    this.updateBlockMining();}
                                  ,  1000/Math.log(2+hash/100))

  }

  changeHash = () => {
    if(Math.random()<=0.99 && this.state.clickTotal!=21){
      this.setState(() => ({
        hash: getNewRandomHash(),
        blockFound:false
      }));
    }
    else{
      this.props.propagate()
      this.setState(() => ({
        hash: getHashAnswer(this.state.difficulty),
        blockFound:true
      }));
    }
  }

  updateBlockMining = () => {
      this.setState(()=>{
        this.changeHash();
        let tmp = this.state.circlesMachineMining;
        tmp[1].numberOfElementsMissing-=1;
        if(tmp[1].numberOfElementsMissing<0){
            tmp[1].numberOfElementsMissing=tmp[1].numberOfElements-1;
        }
          return {circlesMachineMining:tmp}
      })
  }

  handleClickBuy = d => {
    if(d.state.cost<=this.state.cash){
      this.setState((prevState)=>{
        let currentRate = d.state.rate;
        let currentCost = d.state.cost;
        let tmp = prevState.miningRigUpdates.filter(rig=>rig.key===d.key)[0];
        tmp.state.cost*=d.cost_increase;
        tmp.state.count+=1;

        return {
        hashRate : prevState.hashRate + currentRate,
        cash : prevState.cash - currentCost,
        miningRigUpdates: prevState.miningRigUpdates
      }});
      this.newIntervalUpdates(this.state.hashRate + d.state.rate);
    }
  }



  handleClick = () => {
    this.setState(prevState => ({
      clickTotal: prevState.clickTotal += 1,
      // hashRate: prevState.hashRate+1,
      cash: prevState.cash+1/100,
      maxCash: Math.max(prevState.maxCash,prevState.cash+1/100)
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

    return (
        <div>

          <div className="row">
            <div className="col-sm-12 no-padding">
              <HashElement 
                hash={this.state.hash}
                difficulty={this.state.difficulty}
                blockFound={this.state.blockFound}/> 
            </div>
          </div>

          <div className="row">
            {/*LEFT HAND SIDE  */}
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 no-padding">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <Machine
                hashRate = {this.state.hashRate}
                cash = {this.state.cash}
                handleClick = {this.handleClick}
                circlesMachineMining = {this.state.circlesMachineMining}
                temperature = {Math.max(25,this.state.temperature)}
              />
              </div>
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <RigWrapper
                  miningRigUpdates={this.state.miningRigUpdates}
                  cash = {this.state.cash}
                  maxCash = {this.state.maxCash}
                  cost={this.state.cost}
                  handleClickBuy={this.handleClickBuy}
                />
              </div>

              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                {/* <ElecWrapper
                  ElecUpgrade={ElecUpgrade}
                  cash = {this.state.cash}
                  maxCash = {this.state.maxCash}
                  cost={this.state.cost}
                  handleClickBuy={this.handleClickBuy}
                /><br/> */}

                {/* <CoolingWrapper
                  CoolingUpgrade={CoolingUpgrade}
                  cash = {this.state.cash}
                  maxCash = {this.state.maxCash}
                  cost={this.state.cost}
                  handleClickBuy={this.handleClickBuy}
                /> */}
              </div>
            </div>
            {/*RIGHT HAND SIDE  */}
            <br/>
            <br/>
            Wallet: {this.state.cash} USD
            <br/>
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 no-padding">
              <svg className="miningLeft" width="360px" height="200px">
                <line x1="0" y1="1" x2="375" y2="1" stroke="white" strokeWidth="1"/>
                <text x="0" y="15" fill="white" fontSize="10px">BLOCK CANDIDATE</text>
              </svg><br/>

                  <svg className="miningLeft" width="360px" height="200px">
                    <line x1="0" y1="1" x2="375" y2="1" stroke="white" strokeWidth="1"/>
                    <text x="0" y="15" fill="white" fontSize="10px">MERKLE TREE</text>
                  </svg><br/>

              <svg className="miningLeft" width="360px" height="200px">
                <line x1="0" y1="1" x2="375" y2="1" stroke="white" strokeWidth="1"/>
                <text x="0" y="15" fill="white" fontSize="10px">COINBASE</text>
              </svg><br/>

              <div className="row">
                <div className="col-xs-6">
                  <svg className="miningLeft" width="150px" height="200px">
                    <line x1="0" y1="1" x2="150" y2="1" stroke="white" strokeWidth="1"/>
                    <text x="0" y="15" fill="white" fontSize="10px">UTXO</text>
                  </svg>
                </div>

                <div className="col-xs-6">
                  <svg className="miningLeft" width="150px" height="200px">
                    <line x1="0" y1="1" x2="150" y2="1" stroke="white" strokeWidth="1"/>
                    <text x="0" y="15" fill="white" fontSize="10px">MEMPOOL</text>
                  </svg>
                </div>
              </div>

            </div>
          </div>

        </div>
    );
  }
}

export default Mining;
