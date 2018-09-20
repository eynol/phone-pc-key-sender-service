import React, { PureComponent } from 'react';
import { isAlive, send } from '../websocket';


import './FunctionKeys.css'

const pressKey = (key) => isAlive() && send({ type: 'sendkey', key: key, });
class FunctionKeys extends PureComponent {
    render() {
        return (
            <div className="function-keys-layout">
                <span className="button" onClickCapture={() => pressKey('f1')}>F1</span>
                <span className="button" onClickCapture={() => pressKey('f2')}>F2</span>
                <span className="button" onClickCapture={() => pressKey('f3')}>F3</span>
                <span className="button" onClickCapture={() => pressKey('f4')}>F4</span>
                <span className="button" onClickCapture={() => pressKey('f5')}>F5</span>
                <span className="button" onClickCapture={() => pressKey('f6')}>F6</span>
                <span className="button" onClickCapture={() => pressKey('f7')}>F7</span>
                <span className="button" onClickCapture={() => pressKey('f8')}>F8</span>
                <span className="button" onClickCapture={() => pressKey('f9')}>F9</span>
                <span className="button" onClickCapture={() => pressKey('f10')}>F10</span>
                <span className="button" onClickCapture={() => pressKey('f11')}>F11</span>
                <span className="button" onClickCapture={() => pressKey('f12')}>F12</span>
            </div>
        );
    }
}
export default FunctionKeys;
