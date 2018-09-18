const corsMiddleware = require('restify-cors-middleware')

const cors = corsMiddleware({
    preflightMaxAge: 5, //Optional
    origins: ['*'],
    allowHeaders: ['API-Token'],
    exposeHeaders: ['API-Token-Expiry']
})



var restify = require('restify');
var ks = require('node-key-sender');


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

server.get('/configs', (req, res, next) => {
    let config = db.get('configs').values().toJSON()
    res.json({ code: 1, data: config });
    next();
});

server.listen(8080, '0.0.0.0', function () {
    console.log('%s listening at %s', server.name, server.url);
});

function pressPageDown() {
    ks.sendKeys(['page_down']).then(() => console.log('page down'), (e) => console.log('err:', e))
}

function pressPageUp() {
    ks.sendKeys(['page_up']).then(() => console.log('page up'), (e) => console.log('err:', e))
}