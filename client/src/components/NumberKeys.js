import React, { Component } from 'react';
import { isAlive, send } from '../websocket';


import './NumberKeys.css'

import ArrowUpward from '@material-ui/icons/KeyboardArrowUp';
import ArrowDownward from '@material-ui/icons/KeyboardArrowDown';
import ArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import ArrowRight from '@material-ui/icons/KeyboardArrowRight';

const pressKey = (key) => isAlive() && send({ type: 'sendkey', key: key, });

class ArrowKeys extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numLock: true,
    }
  }
  numberLockSwitch = () => {
    this.setState({ numLock: !this.state.numLock });
  }
  render() {

    if (this.state.numLock) {
      return (
        <div className="number-keys-layout">
          <span className="button" onClickCapture={this.numberLockSwitch/* {() =>pressKey('num_lock')}*/}>Num Lock</span>
          <span className="button" onClickCapture={() => pressKey('divide')}>/</span>
          <span className="button" onClickCapture={() => pressKey('multiply')}>*</span>
          <span className="button" onClickCapture={() => pressKey('subtract')}>-</span>
          {/* numbers */}
          <span className="button" onClickCapture={() => pressKey('numpad7')}>7</span>
          <span className="button" onClickCapture={() => pressKey('numpad8')}>8</span>
          <span className="button" onClickCapture={() => pressKey('numpad9')}>9</span>
          <span className="button" onClickCapture={() => pressKey('numpad4')}>4</span>
          <span className="button" onClickCapture={() => pressKey('numpad5')}>5</span>
          <span className="button" onClickCapture={() => pressKey('numpad6')}>6</span>
          <span className="button" onClickCapture={() => pressKey('numpad1')}>1</span>
          <span className="button" onClickCapture={() => pressKey('numpad2')}>2</span>
          <span className="button" onClickCapture={() => pressKey('numpad3')}>3</span>
          <span className="button number-keys--zero" onClickCapture={() => pressKey('numpad0')}>0</span>
          <span className="button" onClickCapture={() => pressKey('decimal')}>.</span>
          <span className="button number-keys--plus" onClickCapture={() => pressKey('add')}>+</span>
          <span className="button number-keys--enter" onClickCapture={() => pressKey('enter')}>Enter</span>
        </div>
      );
    }

    return (
      <div className="number-keys-layout">
        <span className="button" onClickCapture={this.numberLockSwitch/* {() =>pressKey('num_lock')}*/}>Num Lock</span>
        <span className="button" onClickCapture={() => pressKey('divide')}>/</span>
        <span className="button" onClickCapture={() => pressKey('multiply')}>*</span>
        <span className="button" onClickCapture={() => pressKey('subtract')}>-</span>
        {/* numbers */}
        <span className="button" onClickCapture={() => pressKey('home')}>Home</span>
        <span className="button" onClickCapture={() => pressKey('up')}><ArrowUpward /></span>
        <span className="button" onClickCapture={() => pressKey('page_up')}>PgUp</span>
        <span className="button" onClickCapture={() => pressKey('left')}><ArrowLeft /></span>
        <span className="button" >&nbsp;</span>
        <span className="button" onClickCapture={() => pressKey('right')}><ArrowRight /></span>
        <span className="button" onClickCapture={() => pressKey('end')}>End</span>
        <span className="button" onClickCapture={() => pressKey('down')}><ArrowDownward /></span>
        <span className="button" onClickCapture={() => pressKey('page_down')}>PgDn</span>
        <span className="button number-keys--zero" onClickCapture={() => pressKey('insert')}>Ins</span>
        <span className="button" onClickCapture={() => pressKey('delete')}>Del</span>
        <span className="button number-keys--plus" onClickCapture={() => pressKey('add')}>+</span>
        <span className="button number-keys--enter" onClickCapture={() => pressKey('enter')}>Enter</span>
      </div>
    );
  }
}
export default ArrowKeys;
