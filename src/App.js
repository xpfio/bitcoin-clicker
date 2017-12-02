import React, { Component } from 'react';
import './App.css';
// import { Navbar, Jumbotron, Button } from 'react-bootstrap';
// import Wallet from './components/wallet'
// import Blockchain from './components/blockchain'
import Mining from './components/mining'
// import Network from './components/network'
import BlockCandidate from './components/blockCandidate'
import Upgrades from './components/upgrades'

import BgImg from './images/bg.png'

class App extends Component {
  render() {
    let BgImgStyle = {
      position: "absolute",
      width: "100%",
      top:0,
      zIndex:-99,
      left:0,
      opacity:0.2   
    }

    let rectOnTheTopLeft = [...Array(900)].map((d,p)=>{
      let rand = 1+20*Math.random();
      return (<rect key={'recttopleft-'+p} x={p} y={50-rand} width="1" height={rand} fill="grey"/>)
    });

    let aligneLeft = {
      textAlign:'left'
    }

    return (
      <div className="App">
        {/* <Wallet/> */}
        <img src={BgImg} alt="bg img, to be removed" style={BgImgStyle}/>
        <div className="col-sm-12" style={aligneLeft}>
          <svg width="900" height="80">
            {rectOnTheTopLeft}
          </svg>
          <div className="pull-right">
            <svg width="285" height="80">
              <rect x="0" y="20" width="50" height="50" fill="grey"/>
              <text x="25" y="50" fill="white" className="svg-text-center">V1</text>
              <rect x="70" y="20" width="50" height="50" fill="grey"/>
              <text x="95" y="50" fill="white" className="svg-text-center">STA</text>
              <rect x="140" y="20" width="50" height="50" fill="grey"/>
              <text x="165" y="50" fill="white" className="svg-text-center">ACH</text>
              <rect x="210" y="20" width="50" height="50" fill="grey"/>
              <text x="235" y="50" fill="white" className="svg-text-center">SOC</text>
            </svg>
          </div>
        </div>

        <div className="col-sm-1 no-padding">
          <h1>142.12</h1><p>USD</p>
          <h1>12.223</h1><p>BTC</p>
          <h1>0.21212</h1><p>BTC/USD</p>
        </div>
        <div className="col-sm-2 no-padding">
          <h1>A</h1>
        </div>
        <div className="col-sm-12 col-md-12 col-lg-6 no-padding">
          <Mining/>
        </div>
        <div className="col-sm-8 col-md-6 col-lg-3 no-padding">
           {/* <Network/>  */}
        </div>

        <div className="col-sm-4 no-padding">
          <BlockCandidate/>
        </div>
        <div className="col-sm-8 no-padding">
          <Upgrades/>
        </div>
      </div>
    );
  }
}

export default App;
