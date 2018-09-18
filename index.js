const corsMiddleware = require('restify-cors-middleware')

const cors = corsMiddleware({
    preflightMaxAge: 5, //Optional
    origins: ['*'],
    allowHeaders: ['API-Token'],
    exposeHeaders: ['API-Token-Expiry']
})



var restify = require('restify');
var ks = require('node-key-sender');


var server = restify.createServer({
    name: 'Key Sender',

})

server.pre(cors.preflight)
server.use(cors.actual)

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

server.listen(8080, '0.0.0.0', function () {
    console.log('%s listening at %s', server.name, server.url);
});

function pressPageDown() {
    ks.sendKeys(['page_down']).then(() => console.log('page down'), (e) => console.log('err:', e))
}

function pressPageUp() {
    ks.sendKeys(['page_down']).then(() => console.log('page down'), (e) => console.log('err:', e))
}