import React, { PureComponent } from 'react';
import { isAlive, send } from '../websocket';


import './OnlyPageUpAndDown.css'

const pressKey = (key) => isAlive() && send({ type: 'sendkey', key: key, });
class FunctionKeys extends PureComponent {
    render() {
        return (
            <div className="OnlyPageUpAndDown-layout">
                <span className="button" onClickCapture={() => pressKey('page_up')}>PageUp</span>
                <span className="button" onClickCapture={() => pressKey('page_down')}>PageDown</span>
            </div>
        );
    }
}
export default FunctionKeys;
