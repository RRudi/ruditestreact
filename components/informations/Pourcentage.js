import React, { Component }  from 'react';
import moment from 'moment';

class Pourcentage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      pourcentage: 0,
      tempsRestant: 0,
    }
  }

  componentDidMount() {
    console.log('componentDidMount');

    // Calcul du temps restant et du pourcentage
    const heureDebut = moment(this.props.priere.Debut);
    const heureFin = moment(this.props.priere.Fin);
    const tempsRestant = heureFin.diff(moment(), 'm', true).toFixed(0);
    const periodeComplete = heureFin.diff(heureDebut, 'm', true);
    const pourcentage = 100-tempsRestant/periodeComplete*100;

    this.setState({
      pourcentage,
      tempsRestant
    });

    console.log(this.state);
  }

  componentDidUpdate() {
    console.log('componentDidUpdate');
    console.log(this.state);
  }

  render() {
    return (
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
   )
  }
}

export default Pourcentage;