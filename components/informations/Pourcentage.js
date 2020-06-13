import React, { Component }  from 'react';
import moment from 'moment';

class Pourcentage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pourcentage: '',
      tempsRestant: '',
    }

    // Calcul du temps restant et du pourcentage
    const heureDebut = moment(props.priere.Debut);
    const heureFin = moment(props.priere.Fin);
    const tempsRestant = heureFin.diff(moment(), 'm', true);
    const periodeComplete = heureFin.diff(heureDebut, 'm', true);
    const pourcentage = 100-tempsRestant/periodeComplete*100;

    // Mise à jour du State
    this.setState({
      pourcentage,
      tempsRestant
    });
  }

  render() {
    return (
      <div className="progress" style={{height: 40 + 'px', width: 100 + '%'}}>
        <div 
          role="progressbar" 
          style={{width: this.state.pourcentage + '%'}}
          className = { this.state.pourcentage < 90 ? 
          "progress-bar bg-info progress-bar-striped progress-bar-animated" : 
          "progress-bar bg-danger progress-bar-striped progress-bar-animated"} >

          { this.state.tempsRestant < 59 && ( 
            <div>Il te reste { this.state.tempsRestant }</div>
          )}

        </div>
      </div>
   )
  }
}

export default Pourcentage;