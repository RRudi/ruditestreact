import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  
  state = {
    horaires: []
  }

  componentDidMount() {
    axios.get(`https://api.aladhan.com/timingsByAddress/10-06-2020?address=Paris,France&midnightmode=1&method=99&methodSettings=17,null,14&tune=0,1,0,0,-1,3,3,-2,0,0`)
      .then(reponse => {
        console.log(reponse)
        console.log(reponse.data.data.timings)
        const horaires = reponse.data.data.timings;
        this.setState({ horaires });
        console.log(this.state)
      })
  }

  render() {
    return (
      <ul>
        <li>Fajr : { this.state.horaires.Fajr }</li>
        <li>Levé du soleil : { this.state.horaires.Sunrise }</li>
        <li>Dhor : { this.state.horaires.Dhuhr }</li>
        <li>Asr : { this.state.horaires.Asr }</li>
        <li>Maghrib : { this.state.horaires.Maghrib }</li>
        <li>Icha : { this.state.horaires.Isha }</li>
      </ul>
    )
  }
}

export default App;