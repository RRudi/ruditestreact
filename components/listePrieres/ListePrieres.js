import React, { Component } from 'react';
import moment from 'moment';

const HorairePriere = (props) => {
  return (
    <div>
    { props.priere.EstPriere && ( 
      
      <li className="list-group-item list-group-item-action d-flex flex-row justify-content-between align-items-center">
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
    <div className="container d-flex flex-column justify-content-center align-items-center align-items-center">
      <h3 className="mb-5">Liste des prières : </h3>

      <ul className="list-group w-100">
        { this.props.listePriere.map( p => ( <HorairePriere priere = { p } /> ))}
      </ul>

    </div>
    )
  }
}