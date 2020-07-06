import React, { Component } from 'react';

import axios from 'axios';

class Fib extends Component {
  state = {
    seenIndexes: [],
    values: {},
    index: '',
  };

  componentDidMount() {
    this.fetchValues();
    this.fetchIndexes();
  }

  async fetchValues() {
    const values = await axios.get('/api/values/current');
    this.setState({ values: values.data });
  }

  async fetchIndexes() {
    const values = await axios.get('/api/values/all');
    this.setState({ seenIndexes: values.data });
  }

  onSubmit = async event => {
    event.preventDefault();
    await axios.post('/api/values', {
      index: this.state.index,
    });

    this.setState({ index: '' });
  };

  renderSeenIndexes() {
    return this.state.seenIndexes.map(({ number }) => number).join(', ');
  }

  renderValues() {
    return Object.keys(this.state.values).map(key => (
      <div key={key}>
        For index {key} I Caluclated {this.state.values[key]}
      </div>
    ));
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <label>Enter your index: </label>
          <input
            value={this.state.index}
            onChange={ev => this.setState({ index: ev.target.value })}
          />
          <button>Submit</button>
        </form>
        <h3>Indexes</h3>
        {this.renderSeenIndexes()}
        <h3>Caluclated values</h3>
        {this.renderValues()}
      </div>
    );
  }
}

export default Fib;
