import React, { Component } from 'react';

import Machine from './miningElements/machine';
import HashElement from './miningElements/hashElement';
import RigWrapper from './miningElements/rigWrapper';
import ElecWrapper from './miningElements/elecWrapper';
import CoolingWrapper from './miningElements/coolingWrapper';

import numeral from 'numeral';
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
        cash:prevState.cash+(prevState.hashRate)/10,
        maxCash: Math.max(prevState.maxCash,prevState.cash+(prevState.hashRate)/10),
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
    document.title = numeral(this.state.cash).format('0.00 a') + 'USD - Bitcoin Clicker'
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
      cash: prevState.cash+1/10,
      maxCash: Math.max(prevState.maxCash,prevState.cash+1/10)
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
            Wallet: {numeral(this.state.cash).format('0.00 a')}USD
            <br/>
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 no-padding">
              <svg className="miningLeft" width="360px" height="200px">
                <line x1="0" y1="1" x2="375" y2="1" stroke="white" strokeWidth="1"/>
                <text x="0" y="15" fill="white" fontSize="10px">BLOCK CANDIDATE</text>
              </svg><br/>

                  <svg className="miningLeft" width="360px" height="200px">
                    <line x1="0" y1="1" x2="375" y2="1" stroke="white" strokeWidth="1"/>
                    <text x="0" y="15" fill="white" fontSize="10px">MERKLE TREE</text>

                    {[...Array(32)].map((d,p)=><line className="merkle-tree-link" x1="10" y1={30+5*p} x2="65.5" y2={30+5*p} stroke="white" strokeWidth="1"/>)}
                    {[...Array(16)].map((d,p)=><line className="merkle-tree-link" x1="65" y1={32.5+10*p} x2="120.5" y2={32.5+10*p} stroke="white" strokeWidth="1"/>)}
                    {[...Array(8)].map((d,p)=><line className="merkle-tree-link" x1="120" y1={37.5+20*p} x2="175.5" y2={37.5+20*p} stroke="white" strokeWidth="1"/>)}
                    {[...Array(4)].map((d,p)=><line className="merkle-tree-link" x1="175" y1={47.5+40*p} x2="230.5" y2={47.5+40*p} stroke="white" strokeWidth="1"/>)}
                    {[...Array(2)].map((d,p)=><line className="merkle-tree-link" x1="230" y1={67.5+80*p} x2="285.5" y2={67.5+80*p} stroke="white" strokeWidth="1"/>)}
                    {[...Array(1)].map((d,p)=><line className="merkle-tree-link" x1="285" y1={107.5+160*p} x2="340.5" y2={107.5+160*p} stroke="white" strokeWidth="1"/>)}

                    {[...Array(16)].map((d,p)=><line x1="65" y1={30+5*2*p} x2="65" y2={30+5*(2*p+1)} stroke="white" strokeWidth="1"/>)}
                    {[...Array(8)].map((d,p)=><line x1="120" y1={32.5+10*2*p} x2="120" y2={32.5+10*(2*p+1)} stroke="white" strokeWidth="1"/>)}
                    {[...Array(4)].map((d,p)=><line x1="175" y1={37.5+20*2*p} x2="175" y2={37.5+20*(2*p+1)} stroke="white" strokeWidth="1"/>)}
                    {[...Array(2)].map((d,p)=><line x1="230" y1={47.5+40*2*p} x2="230" y2={47.5+40*(2*p+1)} stroke="white" strokeWidth="1"/>)}
                    {[...Array(1)].map((d,p)=><line x1="285" y1={67.5+80*2*p} x2="285" y2={67.5+80*(2*p+1)} stroke="white" strokeWidth="1"/>)}
                    {/* {[...Array(1)].map((d,p)=><line x1="340" y1={107.5+160*p} x2="340" y2={107.5+160*p} stroke="white" strokeWidth="1"/>)} */}

                    <rect x="337.5" y="105" width="5" height="5" fill="white"/>


                  </svg><br/>

              <svg className="miningLeft" width="360px" height="200px">
                <line x1="0" y1="1" x2="375" y2="1" stroke="white" strokeWidth="1"/>
                <text x="0" y="15" fill="white" fontSize="10px">COINBASE</text>
                {[...Array(500)].map((d,p)=><rect fill="white" x={10+10*(p%34)} y={30+10*Math.floor(p/34)} width="4" height="4"/>)}
              </svg><br/>

              <div className="row">
                <div className="col-xs-6">
                  <svg className="miningLeft" width="150px" height="200px">
                    <line x1="0" y1="1" x2="150" y2="1" stroke="white" strokeWidth="1"/>
                    <text x="0" y="15" fill="white" fontSize="10px">UTXO</text>
                    {[...Array(200)].map((d,p)=><circle fill="white" cx={10+10*(p%14)} cy={30+10*Math.floor(p/14)} r="2"/>)}
                  </svg>
                </div>

                <div className="col-xs-6">
                  <svg className="miningLeft" width="150px" height="200px">
                    <line x1="0" y1="1" x2="150" y2="1" stroke="white" strokeWidth="1"/>
                    <text x="0" y="15" fill="white" fontSize="10px">MEMPOOL</text>
                    {[...Array(100)].map((d,p)=><line stroke="white" strokeWidth="1" x1={10+10*((2*p)%14)} x2={10+10*((2*p+1)%14)} y1={32+10*Math.floor(2*p/14)} y2={32+10*Math.floor(2*p/14)}/>)}
                    {[...Array(200)].map((d,p)=><rect fill="white" x={10+10*(p%14)} y={30+10*Math.floor(p/14)} width="4" height="4"/>)}
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
