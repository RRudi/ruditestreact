import React, { Component } from 'react';
import moment from 'moment';

export default class BarreProgressionJeune extends Component {
  
  pourcentageJourneeJeune = 0;

  constructor(props) {
    super(props);

    // Calcul du temps restant et du pourcentage
    const horaireFajr = moment(props.listePriere.find( x => x.Libelle === 'Fajr').Debut);
    const horaireMaghrib = moment(props.listePriere.find( x => x.Libelle === 'Maghrib').Debut);
    const tempsRestant = horaireMaghrib.diff(moment(), 'm', true).toFixed(0);
    const periodeComplete = horaireMaghrib.diff(horaireFajr, 'm', true);
    this.pourcentageJourneeJeune = 100-tempsRestant/periodeComplete*100;
  }

  componentDidMount() {}

  render() {
    return (
    <div className="progress" style={{height: 4 + 'px', width: 100 + '%'}}>
      <div 
        role="progressbar" 
        style={{width: this.pourcentageJourneeJeune + '%'}}
        className = "progress-bar bg-info" >
      </div>
    </div>
    )
  }
}