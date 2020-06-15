import React from 'react';
import moment from 'moment';
import momentHijri from 'moment-hijri';
import { FaVolumeMute } from "react-icons/fa";
import { FaVolumeUp } from "react-icons/fa";
import { FaVolumeUp } from "react-icons/fa";
import './TempsPriere.css';

export default (props) => {

  const dateHegire = momentHijri().format('iYYYY/iM/iD'); // 1436/2/30
  const jourHegire = momentHijri(dateHegire).date(); // 23

   return (
    <div>
      { props.priere.EstPriere && (
        <section className="ligneBagde">
          <span>{ props.priere.Classement }</span>
          { props.priere.EstSilencieuse ? <FaVolumeMute /> : <FaVolumeUp /> }
        </section>
      )}

      <span className = { props.priere.Libelle == "Maghrib" ? "titreTropGros" : "titre" }>
        { props.priere.EstPriere ? props.priere.Libelle : '' }
      </span>

      { props.priere.EstPriere && (
        <section className="ligneBagde">
          <span className="badge badge-pill badge-info">{ props.priere.RakatAvant } Rakats avant</span>
          <span className="badge badge-pill badge-warning">{ props.priere.Rakat } Rakats</span>
          <span className="badge badge-pill badge-info">{ props.priere.RakatApres } Rakats après</span>
        </section>
      )}

      <br />

      { jourHegire == 100 && ( 
        <div>L'Eid est dans 30 jours, réserve vite ton 🐑<br /><br />
        <button className="btn btn-success">C'est parti !</button></div>
      )}

      { jourHegire == 12 && ( 
        <div>Demain c'est les 3 jours blancs ⚪⚪⚪, on jeûne ? </div>
      )}

      { jourHegire == 13 && ( 
        <div>Encore 2 jours ⚫⚪⚪</div>
      )}

      { jourHegire == 14 && ( 
        <div>Dernier jour blanc ⚫⚫⚪</div>
      )}
      
      { moment().weekday() == 0 && ( 
        <div>Demain c'est Lundi, et si on jeûnait ?</div>
      )}

      { moment().weekday() == 3 && ( 
        <div>Demain c'est Jeudi, et si on jeûnait ?</div>
      )}

      { props.priere.Libelle == 'Maghrib'  && ( 
        <div>
        🍉 C'est bon, tu peux casser ton jeune ElhamdouliLlah <br />
        🤲 "La soif s'en est allée, les veines sont irriguées et la récompense est confirmée inchaAllah."
        </div>
      )}
      
      { props.priere.Libelle == 'Fajr' && ( 
        <div>Ton jour de jeûne commence, bon courage</div>
      )}

    </div>
   )
}

