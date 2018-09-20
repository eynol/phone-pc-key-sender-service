import React, { Component } from 'react';
import { withRouter, Route } from 'react-router-dom';

import './App.css';

import SwipeableViews from 'react-swipeable-views';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import RotateRightIcon from '@material-ui/icons/RotateRight';
import PhonelinkIcon from '@material-ui/icons/Phonelink';
import PhonelinkOffIcon from '@material-ui/icons/PhonelinkOff';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TabIcon from '@material-ui/icons/Tab';

import StarIcon from '@material-ui/icons/Star';

import Drawer from '@material-ui/core/Drawer';

import { connect, isAlive, send } from './websocket';
import * as FullscreenHelper from './fullscreen';
import rotatescreen from './rotatescren';

import ArrowKeys from './components/ArrowKeys';
import SecondaryKeys from './components/SecondaryKeys';
import FunctionKeys from './components/FunctionKeys';
import NumberKeys from './components/NumberKeys';
import OnlyPageUpAndDown from './components/OnlyPageUpAndDown';

const FULLSCREEN_SUPPORTED = FullscreenHelper.isFullscreenEnabled();
// screen.lockOrientation('');
// const adapter = new LocalStorage('db')
// const db = low(adapter)

// db.defaults({ hosts: [] })
//   .write();



function connectToLocalPC() {
  if (connectToLocalPC.timmer || isAlive()) {
    return;
  }
  let location = window.location;
  connect('ws://' + location.hostname + ':' + location.port + '/keysender', {
    onopen: () => { console.log('open'); send('ping') },
    onmessage: (ms) => { console.log(ms) },
    onclose: (e) => console.log(e)
  });

  connectToLocalPC.timmer = setTimeout(() => delete connectToLocalPC.timmer, 5000);
}
connectToLocalPC();
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      layer: 'layout',
      online: false,
      fullscreen: false,
      drawer: false,
    };

    this.rotateType = 0;
  }
  componentWillMount() {
    this.checkalive();
    this.intervalTimer = setInterval(this.checkalive, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.intervalTimer);
  }
  checkalive = () => {
    let status = isAlive();
    let online = this.state.online;

    if (online !== status) {
      this.setState({ online: status });
    }

  }
  toggleFullscreen = () => {
    if (this.state.fullscreen) {
      this.setState({ fullscreen: false })
      FullscreenHelper.exitFullscreen();
      this.rotateType = 0;
    } else {
      this.setState({ fullscreen: true })
      FullscreenHelper.launchIntoFullscreen();
    }
  }
  toggleDrawer = (prop, value) => {
    this.setState({ [prop]: value })
  }
  rotateApp = () => {
    rotatescreen(++this.rotateType % 4);
  }

  handleStatus = () => {
    let online = this.state.online;
    if (!online) {
      connectToLocalPC();
    }
  }
  render() {

    const { fullscreen, drawer, online } = this.state;
    const { history } = this.props;

    return (
      <div className="App">
        <Drawer open={drawer} onClose={() => this.toggleDrawer('drawer', false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={() => this.toggleDrawer('drawer', false)}
            onKeyDown={() => this.toggleDrawer('drawer', false)}
          >
            <div>
              <ListItem button onClick={() => history.replace('/')}>
                <ListItemIcon>
                  <TabIcon />
                </ListItemIcon>
                <ListItemText primary="Normal" />
              </ListItem>
              <ListItem button onClick={() => history.replace('/calibre')}>
                <ListItemIcon>
                  <StarIcon />
                </ListItemIcon>
                <ListItemText primary="Calibre" />
              </ListItem>
            </div>
          </div>
        </Drawer>
        <AppBar position="static">
          <Toolbar>
            <IconButton color="inherit" aria-label="Menu">
              <MenuIcon onClick={() => this.toggleDrawer('drawer', true)} />
            </IconButton>
            <Typography variant="title" color="inherit" style={{ textAlign: "left" }} classes={{ root: "flex-grow" }} >
              Key Sender
            </Typography>
            <IconButton color="inherit" onClick={this.handleStatus}>{online ? <PhonelinkIcon /> : <PhonelinkOffIcon />}</IconButton>
            {fullscreen ? <IconButton color="inherit" onClick={this.rotateApp}> <RotateRightIcon /> </IconButton> : null}
            {FULLSCREEN_SUPPORTED ? <IconButton color="inherit" onClick={this.toggleFullscreen}>{fullscreen ? <FullscreenExitIcon color="inherit" /> : <FullscreenIcon color="inherit" />}</IconButton> : null}
          </Toolbar>
        </AppBar>
        {online
          ? <div className="App-content">
            <Route exact path="/" render={() => {
              return (
                <SwipeableViews className="key-container" animateHeight enableMouseEvents>
                  <div className="key-layout">
                    <div className="keys-layout-wrapper"><SecondaryKeys /></div>
                    <div className="keys-layout-wrapper"><ArrowKeys /></div>
                  </div>
                  <div className="key-layout"><div className="keys-layout-wrapper"><FunctionKeys /></div></div>
                  <div className="key-layout"><div className="keys-layout-wrapper"><NumberKeys /></div></div>
                </SwipeableViews>
              )
            }} />
            <Route exact path="/calibre" component={OnlyPageUpAndDown} />
          </div>
          : <div className="flex-grow" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><PhonelinkOffIcon size={54} /><Button onClick={connectToLocalPC}>Connet to PC</Button></div>}
      </div>
    );
  }
}

export default withRouter(App);
