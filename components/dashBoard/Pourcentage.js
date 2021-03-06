import React, { Component }  from 'react';
import moment from 'moment';

class Pourcentage extends Component {

  pourcentage = 100;
  tempsRestant = 0;

  constructor(props) {
    super(props);
    this.state = {
      now: moment().format(),
      pourcentage: 0,
      tempsRestant: 0
    }
  }

  componentDidMount() {
    
    setInterval( () => {
      this.setState({ 
        now: moment().format(),
        pourcentage: this.pourcentage,
        tempsRestant: this.tempsRestant
      });
    }, 1000 );
  }

  componentDidUpdate() {

    this.calculPourcentage();
  }

  calculPourcentage() {
    const heureDebut = moment(this.props.priere.Debut);
    const heureFin = moment(this.props.priere.Fin);
    const periodeComplete = heureFin.diff(heureDebut, 'm', true);

    this.tempsRestant = heureFin.diff(moment(this.state.now), 'm', true).toFixed(0);
    this.pourcentage = 100-this.tempsRestant/periodeComplete*100;
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

          { this.state.tempsRestant != 0 && this.state.tempsRestant < 59 && ( 
            <div>
            { this.props.priere.EstPriere ? "Vite, il te reste " : "Athan dans " }
            { this.state.tempsRestant } min
            </div>
          )}

        </div>
      </div>
   )
  }
}

export default Pourcentage;