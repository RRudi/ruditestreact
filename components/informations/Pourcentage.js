import React, { Component }  from 'react';
import moment from 'moment';

class Pourcentage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      pourcentage: 0,
      tempsRestant: 0
    }
  }

  componentDidMount() {
    // Calcul du temps restant et du pourcentage
    const heureDebut = moment(this.props.priere.Debut);
    const heureFin = moment(this.props.priere.Fin);
    const tempsRestant = heureFin.diff(moment(), 'm', true).toFixed(0);
    const periodeComplete = heureFin.diff(heureDebut, 'm', true);
    const pourcentage = 100-tempsRestant/periodeComplete*100;

    //console.log('now',this.props.now)
    //console.log('tempsRestant',tempsRestant)
    //console.log('pourcentage',pourcentage)
    this.setState({
      pourcentage,
      tempsRestant
    });

  }

  componentDidUpdate() {
    //console.log(this.props.now)
  }

  render() {
    return (
      <div>{ this.props.now }
      <div className="progress" style={{height: 40 + 'px', width: 100 + '%'}}>
        <div 
          role="progressbar" 
          style={{width: this.state.pourcentage + '%'}}
          className = { this.state.pourcentage < 90 ? 
          "progress-bar bg-info progress-bar-striped progress-bar-animated" : 
          "progress-bar bg-warning progress-bar-striped progress-bar-animated"} >

          { this.state.tempsRestant < 59 && ( 
            <div>⏳ Il te reste { this.state.tempsRestant } min</div>
          )}

        </div>
      </div>
      </div>
   )
  }
}

export default Pourcentage;