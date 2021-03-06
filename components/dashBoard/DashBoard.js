import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import TempsRestant from './TempsRestant';
import TempsPriere from './TempsPriere';
import HeureProchainePriere from './HeureProchainePriere';
import Pourcentage from './Pourcentage';

export default class DashBoard extends Component {
  
  priereActuelle = null;

  constructor(props) {
    super(props);
    this.state = {
      now: moment().format()
    }
    this.selectionnerPriere();
  }

  componentDidMount() {
    setInterval( () => this.setState({ now: moment().format() }), 120000 );
  }
  
  componentDidUpdate() {
    this.selectionnerPriere();
  }

  selectionnerPriere() {
    const date = moment(this.state.now);
    const dateLocale = date.format();
    this.priereActuelle = this.props.listePriere.find( 
      x => moment(x.Debut).format() < dateLocale
        && moment(x.Fin).format() > dateLocale)
  }

  render() {
    return (
      <div className="p-3 w-75">
        { this.priereActuelle == null ? 'Whitney Houston, we have a problemouse...' : (
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