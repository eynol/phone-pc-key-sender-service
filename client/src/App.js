import React, { Component } from 'react';

import './App.css';
import low from 'lowdb';
import LocalStorage from 'lowdb/adapters/LocalStorage'
import SwipeableViews from 'react-swipeable-views';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Backdrop from '@material-ui/core/Backdrop';
import { connect, close, isAlive, send } from './websocket';


import ArrowKeys from './components/ArrowKeys';

const adapter = new LocalStorage('db')
const db = low(adapter)

db.defaults({ hosts: [] })
  .write();


const pressKey = (key) => send({ type: 'sendkey', key: key, });
const pressUp = () => pressKey('up');
const pressLeft = () => pressKey('left');
const pressRight = () => pressKey('right');
const pressDown = () => pressKey('down');


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      layer: 'layout',
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
  componentDidMount() {

    let location = window.location;
    connect(location.protocol + '//' + location.hostname + ':' + location.port + '/keysender/', {
      onopen: () => { console.log('open');send('yess') },
      onmessage: (ms) => { console.log(ms) },
      onclose: (e) => console.log(e)
    });
  }
  render() {

    return (
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <IconButton color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" >
              Key Sender
              </Typography>
          </Toolbar>
        </AppBar>
        <SwipeableViews className="key-container" animateHeight enableMouseEvents>
          <div className="key-layout">

            <div className="directions-key-layout-wrapper">
              <div className="directions-key-layout">
                <ArrowKeys />
              </div>
            </div>
          </div>
          <div className="key-layout">
            <div>
            </div>
          </div>
          <div className="key-layout">slide n°3</div>
        </SwipeableViews>
      </div>
    );
  }
}

export default App;
