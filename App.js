import React, { Component } from 'react';
import Informations from './components/informations/Informations';
import Header from './components/Header';

class App extends Component {
  
  

  render() {
    return (
      <div>
        <Header />
        <Informations />
      </div>
    )
  }
}

export default App;