import React from 'react';

export default (props) => {

   return (
    <div class="alert alert-warning" role="alert">
      La prochaine prière est à  { moment(props.finPriere).format("HH:mm") }
    </div>
   )
}