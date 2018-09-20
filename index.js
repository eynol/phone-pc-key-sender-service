const corsMiddleware = require('restify-cors-middleware')
var serveStatic = require('serve-static-restify')
const cors = corsMiddleware({
    preflightMaxAge: 5, //Optional
    origins: ['*'],
    allowHeaders: ['API-Token'],
    exposeHeaders: ['API-Token-Expiry']
})

var notifier = require('node-notifier');
var fs = require('fs');
var restify = require('restify');
var ks = require('node-key-sender');
var WebSocket = require('ws');

(function () {
    // Since node-key-sender has not been updated on npmjs.com, we have to update it manually.

    var file = fs.readFileSync(__dirname + '/node_modules/node-key-sender/key-sender.js');
    var text_file = file.toString();
    if (text_file.search("var command = 'java -jar \\'' + jarPath + '\\' ' + arrParams.join(' ')")) {
        text_file = text_file.replace(/'java -jar \\'' \+ jarPath \+ '\\' '/g, "'java -jar \\\"' + jarPath + '\\\" '");
        fs.writeFileSync(__dirname + '/node_modules/node-key-sender/key-sender.js', text_file);
        delete require.cache[require.resolve('node-key-sender')]
        ks = require('node-key-sender');
        console.log('[fixed] node-key-sender')
    }
}())



// ks.setOption('startDelayMillisec', 20);
/**
 * 
 * 
 *  DB config
 */
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)
db.defaults({ configs: [] })
    .write()





/**
 *  Server config
 */
var server = restify.createServer({
    name: 'Key Sender',

})

server.pre(cors.preflight)
server.pre(serveStatic('build/', { 'index': ['index.html', 'index.htm'] }))


server.use(cors.actual)


server.get('/ping', (req, res, next) => {
    res.json({ code: 1 });
    next();
});

server.get('/page_down', (req, res, next) => {
    res.json({ code: 1 });
    pressPageDown()
    next();
});

server.get('/page_up', (req, res, next) => {
    res.json({ code: 1 });
    pressPageUp();
    next();
});


server.get('/zh', (req, res, next) => {
    res.json({ code: 1 });
    zh();
    next();
});


server.get('/configs', (req, res, next) => {
    let config = db.get('configs').values().toJSON()
    res.json({ code: 1, data: config });
    next();
});


/**
 *  WebSocket config
 */

const wss = new WebSocket.Server({ server, path: '/keysender' });
wss.on('connection', function connection(ws) {
    notifier.notify({
        title: '新设备已连接',
        message: 'IP=>[' + ws._socket.remoteAddress + ']',
    })
    ws.on('message', function incoming(message) {
        let req;
        if (/^{/.test(message)) {
            try {
                req = JSON.parse(message);
            } catch (e) {
                req = message;
            }

            if (req.type === 'sendkey') {
                switch (req.key) {
                    case 'page_down': {
                        pressPageDown();
                        break;
                    }
                    case 'page_up': {
                        pressPageUp();
                    }
                    default: {
                        sendKey(req.key);
                    }
                }
            }
        } else {
            if (message === 'ping') {
                ws.send('pong');
            }
        }

        console.log('received: %s', message);
    });

    ws.send('ping');
});



server.listen(8080, '0.0.0.0', function () {
    console.log('%s listening at %s', server.name, server.url);
});


function sendKey(key) {
    ks.sendKey(key).then(() => console.log(key), (e) => console.log('err:', e))
}

function pressPageDown() {
    ks.sendKey('page_down').then(() => console.log('page down'), (e) => console.log('err:', e))
}

function pressPageUp() {
    ks.sendKey('page_up').then(() => console.log('page up'), (e) => console.log('err:', e))
}
