import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  
  state = {
    persons: []
  }

  componentDidMount() {
    axios.get(`https://api.aladhan.com/timingsByAddress/10-06-2020?address=Paris,France&midnightmode=1&method=99&methodSettings=17,null,14&tune=0,1,0,0,-1,3,3,-2,0,0`)
      .then(res => {
        const persons = res.data;
        this.setState({ persons });
      })
  }

  render() {
    return (
      <ul>
        <li>Test</li>
        { this.state.persons.map(person => <li>{person.name}</li>)}
      </ul>
    )
  }
}

export default App;