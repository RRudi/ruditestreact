import React from 'react';

export default (props) => {

   return (
      <div className="progress" style={{height: 40 + 'px', width: 100 + '%'}}>
        <div 
          className = { props.pourcentage < 90 ? "progress-bar bg-info progress-bar-striped progress-bar-animated" : "progress-bar bg-danger progress-bar-striped progress-bar-animated"}
          role="progressbar" 
          style={{width: props.pourcentage + '%'}}
          ></div>
      </div>
   )
}
