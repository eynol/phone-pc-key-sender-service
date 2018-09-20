
let ws = null;
let alive = false;
export function connect(host, options = {}) {
    if (/wss?:\/\/\w+([.]\w+)?/.test(host)) {

        close()
        try {
            ws = new WebSocket(host);
        } catch (err) {
            return;
        }
        const noop = () => { };
        const {
            onopen = noop,
            onmessage = noop,
            onclose = noop
        } = options;

        ws.onerror = (e) => {
            try { ws.close() } catch (e) { }
            ws = null;
            alive = false;
            console.error(e);
        }
        ws.onopen = () => {
            alive = true;
            onopen();
            // callback
        };
        ws.onmessage = (e) => {
            let message = e.data;

            if (message === 'ping') { console.log('pong! alive'); }
            if (message === 'pong') { console.log(' alive'); }
            else {
                onmessage(message);
            }
        };
        ws.onclose = () => {
            ws = null;
            alive = false;
            onclose() // callback
        };
    }
}
export function send(message) {
    if (typeof message === 'object') {
        ws.send(JSON.stringify(message))
    } else {
        ws.send(message);
    }
}
export function isAlive() { return alive }
export function close(...d) {
    if (ws !== null) {
        ws.close(...d)
        ws = null;
    }
}