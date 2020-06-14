import React, { Component }  from 'react';
import moment from 'moment';

class Pourcentage extends Component {

  pourcentage;
  tempsRestant;

  constructor(props) {
    super(props);
    this.state = {
      now: moment().format()
    }
  }

  componentDidMount() {
    
    this.calculPourcentage();
    setInterval( () => this.setState({ now: moment().format() }), 5000 );
  }

  componentDidUpdate() {

    this.calculPourcentage();
  }

  calculPourcentage() {
    
    // Calcul du temps restant et du pourcentage
    const heureDebut = moment(this.props.priere.Debut);
    const heureFin = moment(this.props.priere.Fin);
    const periodeComplete = heureFin.diff(heureDebut, 's', true);

    this.tempsRestant = heureFin.diff(moment(this.state.now), 's', true).toFixed(0);
    this.pourcentage = 100-this.tempsRestant/periodeComplete*100;
  }

  render() {
    return (
      <div>{ this.state.now }
      <div className="progress" style={{height: 40 + 'px', width: 100 + '%'}}>
        <div 
          role="progressbar" 
          style={{width: this.pourcentage + '%'}}
          className = { this.pourcentage < 90 ? 
          "progress-bar bg-info progress-bar-striped progress-bar-animated" : 
          "progress-bar bg-warning progress-bar-striped progress-bar-animated"} >

          { this.tempsRestant < 59 && ( 
            <div>⏳ Il te reste { this.tempsRestant } min</div>
          )}

        </div>
      </div>
      </div>
   )
  }
}

export default Pourcentage;