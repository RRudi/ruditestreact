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
      now: new Date().getSeconds()
    }

    console.log('now', this.state.now);
    // Selection de la priere en cours
    const now = moment().format();
    this.priereActuelle = this.props.listePriere.find( 
      x => moment(x.Debut).format() < now 
        && moment(x.Fin).format() > now)
  }

  componentDidMount() {
    console.log('componentDidMount');

    // Mise à jour avec setState
    //setTimeout(() => this.miseAJourDuState(), 3000);
    //setInterval( () => this.setState({ now: new Date().getSeconds() }), 1000 );
  }
  
  componentDidUpdate() {
    console.log('4',this.state)
  }

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