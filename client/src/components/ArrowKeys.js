import React, { Component } from 'react';
import { connect, close, isAlive, send } from '../websocket';


import './ArrowKeys.css'

import ArrowUpward from '@material-ui/icons/KeyboardArrowUp';
import ArrowDownward from '@material-ui/icons/KeyboardArrowDown';
import ArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import ArrowRight from '@material-ui/icons/KeyboardArrowRight';

const pressKey = (key) => send({ type: 'sendkey', key: key, });
const pressUp = () => isAlive() && pressKey('up');
const pressLeft = () => isAlive() && pressKey('left');
const pressRight = () => isAlive() && pressKey('right');
const pressDown = () => isAlive() && pressKey('down');


class ArrowKeys extends Component {
  constructor(props) {
    super(props);
    this.state = {
      layer: 'layout',
      online: false,
      host: '',
    }
  }

  render() {


    return (
      <div className="arrow-keys-layout">
        <span className="button arrow-keys-layout--up" onMouseDown={pressUp}><ArrowUpward classes={{ root: "arrow-keys-icon" }} /></span>
        <span className="button arrow-keys-layout--left" onClickCapture={pressLeft}><ArrowLeft classes={{ root: "arrow-keys-icon" }} /></span>
        <span className="button arrow-keys-layout--down" onClickCapture={pressDown}> <ArrowDownward classes={{ root: "arrow-keys-icon" }} /></span>
        <span className="button arrow-keys-layout--right" onClickCapture={pressRight}><ArrowRight classes={{ root: "arrow-keys-icon" }} /></span>
      </div>
    );
  }
}
export default ArrowKeys;
