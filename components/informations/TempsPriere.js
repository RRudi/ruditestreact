import React from 'react';
import moment from 'moment';
import { BsFillVolumeMuteFill } from "react-icons/bs";
import { BsFillVolumeUpFill } from "react-icons/bs";
import './TempsPriere.css';

export default (props) => {

   return (
    <div>

      { props.priere.EstPriere && (
        <section className="ligneBagde">
          <span className="badge badge-pill badge-info">{ props.priere.Classement } / 5</span>

          { props.priere.EstSilencieuse ? 
          (
            <span className="badge badge-pill badge-warning"><BsFillVolumeMuteFill /></span>
          ) :
          (
          <span className="badge badge-pill badge-info"><BsFillVolumeUpFill /></span>
          )}

        </section>
      )}

      <span className="titre">
        { props.priere.EstPriere ? props.priere.Libelle : '' }
      </span>

      { props.priere.EstPriere && (
        <section className="ligneBagde">
          <span className="badge badge-pill badge-info">{ props.priere.RakatAvant } Rakats</span>
          <span className="badge badge-pill badge-warning">{ props.priere.Rakat } Rakats</span>
          <span className="badge badge-pill badge-info">{ props.priere.RakatApres } Rakats</span>
        </section>
      )}

      <br />

      { moment().weekday() == 7 && ( 
        <div>Demain c'est Lundi, et si on jeûnait ?</div>
      )}

      { moment().weekday() == 3 && ( 
        <div>Demain c'est Jeudi, et si on jeûnait ?</div>
      )}

      { props.priere.Libelle == 'Maghrib' && ( 
        <div>C'est bon, tu peux casser ton jeune ElhamdouliLlah </div>
      )}

      { props.priere.Libelle == 'Maghrib' && ( 
        <div>C'est bon, tu peux casser ton jeune ElhamdouliLlah </div>
      )}
      
      { props.priere.Libelle == 'Fajr' && ( 
        <div>Ton jour de jeûne commence, bon courage</div>
      )}

    </div>
   )
}

