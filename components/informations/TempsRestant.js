import React from 'react';

export default (props) => {

   return (
    <div class="alert alert-info" role="alert">
        La fin est dans { props.fromNow }
    </div>
   )
}