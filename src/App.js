import React, { Component } from 'react';
import './App.css';

import Header from './components/header'
import Mining from './components/mining'
import Network from './components/network'
import Upgrades from './components/upgrades'

import ReactGA from 'react-ga';
ReactGA.initialize('UA-110679720-1');
ReactGA.pageview(window.location.pathname + window.location.search);

class App extends Component {

  componentDidMount = () => {
    setInterval(this.triggerNetwork,30000);
  }


  triggerNetwork = () => {
    console.log('AA')
    let cities = [
"Novosibirsk",
"Phoenix",
"Bulawayo",
"Oran",
"Semarang",
"Recife",
"Kobe",
"Daejeon",
"Kampala",
    ];
    var randomItem = cities[Math.floor(Math.random()*cities.length)];
    this.network.triggerUpdateNetwork(randomItem);
  }
  render() {

    let StyleSideBarLeft = {
      maxWidth:'375px'
    };

    return (
      <div className="App">
        <div className="row"><div className="visible-xs"><p>Not optimised for mobile! I mean, it works, but good luck!</p></div></div>
        <div className="row">
            <div className="col-sm-12">
                <div className="pull-right">
                      <Header/>  
                </div>
            </div> 
        </div>

        <div className="col-sm-12 col-md-12 col-lg-7 no-padding">
           <Mining
           propagate={()=>this.network.triggerUpdateNetwork('Paris')}
           /> 
        </div>
        
        <div className="col-sm-12 col-md-12 col-lg-5 no-padding hidden-xs">
            <Network ref={instance => { this.network = instance; }}/>
            {/* <button onClick={this.triggerNetwork}>Click</button>   */}
          <Upgrades/>
        </div>
      </div>
    );
  }
}

export default App;
