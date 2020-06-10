import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'Rudi'
    };
  }

  render() {
    return (
      <div>
        <Hello name={this.state.name} />
        <p>
          Il n'y a plus qu'à coder !
        </p>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
