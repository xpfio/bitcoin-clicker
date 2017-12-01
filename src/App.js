import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Navbar, Jumbotron, Button } from 'react-bootstrap';
import Wallet from './components/wallet'
import Blockchain from './components/blockchain'
import Mining from './components/mining'
import Network from './components/network'
import BlockCandidate from './components/blockCandidate'
import Upgrades from './components/upgrades'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Wallet/>
        <div className="col-sm-12">
          {/* <Blockchain/> */}
        </div>

        <div className="col-sm-4">
          <Mining/>
        </div>
        <div className="col-sm-8">
          <Network/>
        </div>

        <div className="col-sm-4">
          <BlockCandidate/>
        </div>
        <div className="col-sm-8">
          <Upgrades/>
        </div>
      </div>
    );
  }
}

export default App;
