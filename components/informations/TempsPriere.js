import React from 'react';
import './TempsPriere.css';

export default (props) => {

   return (
    <div>

      <span className="titre">
      { props.nomPriere == 'LimiteAsr' || props.nomPriere == 'Midnight' ? 'Pas de prière' : props.nomPriere }</span>

      <br />

      { props.nomPriere == 'Maghrib' && ( 
        <div>C'est bon, tu peux casser ton jeune ElhamdouliLlah </div>) }
      
      { props.nomPriere == 'Fajr' && ( 
        <div>Ton jour de jeûne commence, bon courage</div>) }

    </div>
   )
}

