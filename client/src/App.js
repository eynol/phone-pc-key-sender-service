import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import low from 'lowdb';
import LocalStorage from 'lowdb/adapters/LocalStorage'

const adapter = new LocalStorage('db')
const db = low(adapter)

db.defaults({ hosts: [] })
  .write()

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      online: false,
      host: '',
    }
  }
  connect = () => {
    let host = this.textare.value;
    this.setState({
      host: host,
    })
  }
  pageDown = () => {
    if (!this.state.host) return;
    fetch(this.state.host + '/page_down').then(resp => resp.json()).then(result => console.log(result));
  }
  pageUp = () => {
    if (!this.state.host) return;
    fetch(this.state.host + '/page_up').then(resp => resp.json()).then(result => console.log(result));
  }
  render() {
    return (
      <div className="App">
        <div>
          <textarea ref={node => this.textare = node}></textarea>
          <button onClick={this.connect}>AddHost</button>
        </div>
        <div className="key-container">
          <div className="key" onClick={this.pageUp}>PageUp</div>
          <div className="key" onClick={this.pageDown}>PageDown</div>
        </div>

      </div>
    );
  }
}

export default App;
