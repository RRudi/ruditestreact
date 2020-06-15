import React, { Component } from 'react';
import moment from 'moment';
import momentHijri from 'moment-hijri';
import axios from 'axios';
import { FaVolumeMute } from "react-icons/fa";
import { FaVolumeUp } from "react-icons/fa";
import { FaVolumeUp } from "react-icons/fa";
import './TempsPriere.css';

export default class TempsPriere extends Component {

  dateHegire = null;
  jourHegire = null;
  urlAPI = "https://api.aladhan.com/v1/gToHCalendar/8/2020";

  constructor(props) {
    super(props);
    this.state = {}

    this.dateHegire = momentHijri().format('iYYYY/iM/iD'); // 1436/2/30
    this.jourHegire = momentHijri(this.dateHegire).date(); // 23
  }

  componentDidMount() {

    axios.get(this.urlAPI)
      .then( response => {
        const data = response.data.data;
        console.log(data[0])
        const test2 = [];
        const test = data.filter(d => d.hijri.holidays.length > 0 ).map(x => ({ 
          dateH: x.hijri.date, 
          holiday: x.hijri.holidays, 
          dateG: x.gregorian.date 
        }))

        console.log(test)

      })
      .catch( err => console.log(err))
      
  }

  render() {
    return (
      <div>
        { this.props.priere.EstPriere && (
          <section className="ligneBagde">
            <span>{ this.props.priere.Classement }</span>
            { this.props.priere.EstSilencieuse ? <FaVolumeMute /> : <FaVolumeUp /> }
          </section>
        )}

        <span className = { this.props.priere.Libelle == "Maghrib" ? "titreTropGros" : "titre" }>
          { this.props.priere.EstPriere ? this.props.priere.Libelle : '' }
        </span>

        { this.props.priere.EstPriere && (
          <section className="ligneBagde">
            <span className="badge badge-pill badge-info">{ this.props.priere.RakatAvant } Rakats</span>
            <span className="badge badge-pill badge-warning">{ this.props.priere.Rakat } Rakats</span>
            <span className="badge badge-pill badge-info">{ this.props.priere.RakatApres } Rakats</span>
          </section>
        )}

        <br />

        { this.jourHegire == 100 && ( 
          <div>L'Eid est dans quelques jours, réserve vite ton 🐑<br /><br />
          <button className="btn btn-success">C'est parti !</button></div>
        )}

        { this.jourHegire == 12 && ( 
          <div>💡 Demain c'est les 3 jours blancs ⚪⚪⚪, on jeûne ? </div>
        )}

        { this.jourHegire == 13 && ( 
          <div>Encore 2 jours ⚫⚪⚪</div>
        )}

        { this.jourHegire == 14 && ( 
          <div>Dernier jour blanc ⚫⚫⚪</div>
        )}
        
        { moment().weekday() == 0 && ( 
          <div>💡 Demain c'est Lundi, et si on jeûnait ?</div>
        )}

        { moment().weekday() == 3 && ( 
          <div>💡 Demain c'est Jeudi, et si on jeûnait ?</div>
        )}

        { this.props.priere.Libelle == 'Maghrib' && ( 
          <div>
          🍉 C'est bon, tu peux casser ton jeune ElhamdouliLlah <br />
          🤲 "La soif s'en est allée, les veines sont irriguées et la récompense est confirmée inchaAllah."
          </div>
        )}
        
        { this.props.priere.Libelle == 'Fajr' && ( 
          <div>Ton jour de jeûne commence, bon courage 💪</div>
        )}

      </div>
    )
  }
}