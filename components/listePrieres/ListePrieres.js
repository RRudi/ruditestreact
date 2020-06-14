import React, { Component } from 'react';
import moment from 'moment';
import { WiSunrise } from "react-icons/wi";
import { WiDaySunny } from "react-icons/wi";
import { WiDayCloudy } from "react-icons/wi";
import { WiSunset } from "react-icons/wi";
import { WiHorizon } from "react-icons/wi";
import { WiMoonrise } from "react-icons/wi";
import { WiHorizonAlt } from "react-icons/wi";
import { WiNightClear } from "react-icons/wi";

const HorairePriere = (props) => {
  return (
    <div>
    { props.priere.EstAfficherDansListe && ( 
      
      <li className="m-1 list-group-item list-group-item-action d-flex flex-row justify-content-between align-items-center">
        <h2>
        { props.priere.Ordre == 0 && ( 
           <WiHorizonAlt />
        )}
        { props.priere.Ordre == 1 && ( 
           <WiNightClear />
        )}
        { props.priere.Ordre == 2 && ( 
           <WiDaySunny />
        )}
        { props.priere.Ordre == 3 && ( 
           <WiDayCloudy />
        )}
        { props.priere.Ordre == 4 && ( 
           <WiHorizon />
        )}
        { props.priere.Ordre == 5 && ( 
           <WiMoonrise />
        )}
       </h2>
        <span>{ props.priere.Libelle }</span>
        <button type="button" class="btn btn-info">{ props.priere.Horaire }</button>
      </li>

    )}
    </div>
  )
}

export default class ListePrieres extends Component {
  
  constructor(props) {
    console.log('ListePrieres')
    super(props);

    console.log(props.listePriere[0].Libelle)
  }

  componentDidMount() {}

  render() {
    return (
    <div className="container d-flex flex-column justify-content-center align-items-center align-items-center">      <ul className="list-group w-100">
        { this.props.listePriere.map( p => ( <HorairePriere priere = { p } /> ))}
      </ul>

    </div>
    )
  }
}