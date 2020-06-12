import React from 'react';

export default (props) => {

   return (
      <div className="progress" style={{height: 60 + 'px'}}>
        <div 
          className="progress-bar bg-success progress-bar-striped progress-bar-animated" 
          role="progressbar" 
          style={{width: props.pourcentage + '%'}} 
          aria-valuenow="25" 
          aria-valuemin="0" 
          aria-valuemax="100">
        </div>
      </div>
   )
}
