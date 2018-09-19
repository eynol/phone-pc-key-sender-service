const corsMiddleware = require('restify-cors-middleware')

const cors = corsMiddleware({
    preflightMaxAge: 5, //Optional
    origins: ['*'],
    allowHeaders: ['API-Token'],
    exposeHeaders: ['API-Token-Expiry']
})


var fs = require('fs');
var restify = require('restify');
var ks = require('node-key-sender');
var sockjs = require('sockjs');

(function () {
    // Since node-key-sender has not been updated on npmjs.com, we have to update it manually.

    var file = fs.readFileSync(__dirname + '/node_modules/node-key-sender/key-sender.js');
    var text_file = file.toString();
    if (text_file.search("var command = 'java -jar \\'' + jarPath + '\\' ' + arrParams.join(' ')")) {
        text_file = text_file.replace(/'java -jar \\'' \+ jarPath \+ '\\' '/g, "'java -jar \\\"' + jarPath + '\\\" '");
        fs.writeFileSync(__dirname + '/node_modules/node-key-sender/key-sender.js', text_file);
        ks = require('node-key-sender');
        console.log('[fixed] node-key-sender')
    }
}())




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

var echo = sockjs.createServer({});
echo.on('connection', function (conn) {
    conn.on('data', function (message) {
        let req;
        try {
            req = JSON.parse(message);
        } catch (e) {
            console.error(e);
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
    });
    conn.write('test');
});



echo.installHandlers(server.server, { prefix: '/keysender' });

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
