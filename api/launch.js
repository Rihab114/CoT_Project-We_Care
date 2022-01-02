#!/usr/bin/env node
const app = require('./app');
const config = require('./env.config');
const debug = require('debug')('phoenix:server');
// config.initRefreshSecret();
const tls = require('spdy'); // enable : http2 + https (http2 over tls)
const fs = require('fs');
let helmet = require('helmet');
const options = {
    key: fs.readFileSync(config["key-file"]),
    cert: fs.readFileSync(config["cert-file"]),
    dhparam: fs.readFileSync(config["dh-strongfile"])
}
app.use(helmet());
app.use(function(req,resp,next){
    if(req.method == 'OPTIONS' //SetCORSheader//){}

else{
    next();
}
});
const server = tls.createServer(options, app);
Server.listen(8443, (error) => { }); // à faire ( fonction d'erreur )
Server.on('error', onError);
Server.on('listening', onListening);
function.onError(); // à faire
function.onListening(); // à faire