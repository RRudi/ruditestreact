import React from 'react';
import moment from 'moment';

export default (props) => {

   return (
    <div>
      { props.priere.Libelle == 'LimiteAsr' || props.priere.Libelle == 'Midnight' ? 'Prochaine prière à ' : "T'as jusqu'à " }
      { moment(props.priere.Fin).format("HH:mm") }
    </div>
   )
}