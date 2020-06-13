import React from 'react';
import moment from 'moment';

export default (props) => {

   return (
    <div>
      <span className="badge badge-pill badge-info">
        { props.priere.EstPriere ? "T'as jusqu'à " : "Prochaine prière à " }
        { moment(props.priere.Fin).format("HH:mm") }
      </span>
    </div>
   )
}