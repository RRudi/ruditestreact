import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import TempsRestant from './TempsRestant';
import TempsPriere from './TempsPriere';
import HeureProchainePriere from './HeureProchainePriere';
import Pourcentage from './Pourcentage';

export default class Informations extends Component {
  
  priereActuelle = '';

  constructor(props) {
    super(props);
    this.state = {
      now: moment().format()
    }

    const now = moment().format();
    this.priereActuelle = this.props.listePriere.find( 
      x => moment(x.Debut).format() < now 
        && moment(x.Fin).format() > now)
  }

  componentDidMount() {
    setInterval( () => this.setState({ now: moment().format() }), 10000 );
  }
  
  componentDidUpdate() {}

  render() {
    return (
      <div className="p-3 w-75">
        { this.priereActuelle == '' ? 'Chargement...' : (
          <div>
            <TempsPriere priere = { this.priereActuelle } />
            <br />
            <Pourcentage priere = { this.priereActuelle } />
            <br />
            <HeureProchainePriere priere = { this.priereActuelle } />
          </div>
        )}
      </div>
    )
  }
}