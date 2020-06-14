import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import TempsRestant from './TempsRestant';
import TempsPriere from './TempsPriere';
import HeureProchainePriere from './HeureProchainePriere';
import Pourcentage from './Pourcentage';

export default class Informations extends Component {
  
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {}

  render() {
    return (
      <div className="p-3 w-75">
        <div>
          <TempsPriere priere = { this.props.priereActuelle } />
          <br />
          <Pourcentage priere = { this.props.priereActuelle } />
          <br />
          <HeureProchainePriere priere = { this.props.priereActuelle } />
        </div>
      </div>
    )
  }
}