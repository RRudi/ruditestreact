import React from 'react';
import moment from 'moment';

export default (props) => {

   return (
    <div>
      T'as encore jusqu'à  { moment(props.finPriere).format("HH:mm") }
    </div>
   )
}