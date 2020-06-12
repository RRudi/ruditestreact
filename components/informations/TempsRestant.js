import React from 'react';

export default (props) => {

   return (
    <div class="alert alert-info" role="alert">
        La prochaine prière est { props.fromNow }
    </div>
   )
}