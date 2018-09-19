
let ws = null;
export function connect(host, options = {}) {
    if (/wss?:\/\/\w+([.]\w+)?/.test(host)) {

        close()

        ws = new WebSocket(host);
        const noop = () => { };
        const { onopen = noop, onmessage = noop, onclose = noop } = options;

        ws.onerror = (e) => console.log(e);
        ws.onopen = onopen;
        ws.onmessage = onmessage;
        ws.onclose = () => { ws = null; onclose() };
    }
}
export function send(message) {
    if (typeof message === 'object') {
        ws.send(JSON.stringify(message))
    } else {
        ws.send(message);
    }
}
export function isAlive() { return ws !== null }
export function close(...d) {
    if (ws !== null) {
        ws.close(...d)
        ws = null;
    }
}