import React, { PureComponent } from 'react';
import { isAlive, send } from '../websocket';


import './SecondaryKeys.css'

const pressKey = (key) => isAlive() && send({ type: 'sendkey', key: key, });
class SecondaryKeys extends PureComponent {
    render() {
        return (
            <div className="secondary-keys-layout">
                <span className="button" onMouseDown={() => pressKey('@154')}>Print Screen</span>
                <span className="button" onClickCapture={() => pressKey('scroll_lock')}>Scroll Lock</span>
                <span className="button" onClickCapture={() => pressKey('pause')}>Pause</span>
                <span className="button" onMouseDown={() => pressKey('insert')}>Insert</span>
                <span className="button" onClickCapture={() => pressKey('home')}>Home</span>
                <span className="button" onClickCapture={() => pressKey('page_up')}>Page Up</span>
                <span className="button" onClickCapture={() => pressKey('delete')}>Delete</span>
                <span className="button" onClickCapture={() => pressKey('end')}>End</span>
                <span className="button" onClickCapture={() => pressKey('page_down')}>Page Down</span>
            </div>
        );
    }
}
export default SecondaryKeys;
