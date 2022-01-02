var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fs = require('fs');
const https = require('https');
const http = require('http');
const sts = require('strict-transport-security');
const mqtt = require('mqtt');
const moment = require('moment');
const mongoose = require("mongoose");

const privateKey = fs.readFileSync('./certificates/privkey.pem', 'utf8');
const certificate = fs.readFileSync('./certificates/cert.pem', 'utf8');
const ca = fs.readFileSync('./certificates/chain.pem', 'utf8');
var usersRouter = require('./routes/users');
var mqttsRouter = require('./routes/mqtts')
var app = express();
var cors = require('cors')

app.use(cors())
const credentials = {
 key: privateKey,
 cert: certificate,
 ca: ca
};
const globalSTS = sts.getSTS({
  'max-age':{'days': 365},
  'includeSubDomains': 'false',
  'preload': true
});
app.use(globalSTS);

mongoose.connect(
    `mongodb+srv://taieb:Tibou2019@cluster0.6jy8z.mongodb.net/smartlypark?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    }
);// view engine setup
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/users', usersRouter);
app.use('/mqtts', mqttsRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.send(err.message);
});

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);


//Expose socket.io-client and jquery to clients in browser
app.use('/lib', express.static(path.join(__dirname, 'node_modules/socket.io-client/dist/')));
app.use('/lib', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
//If request is via https execute next, else redirect to https
app.use((req, res, next) => {
  if (req.secure) {
    next();
  } else {
    res.redirect('https://' + req.headers.host + req.url);
  }
});
//Open https listener
httpsServer.listen(443, () => {
 console.log('HTTPS Server running on port 443');
});
//Open http listener
httpServer.listen(80, () => {
  console.log('HTTP Server running on port 80');
});
module.exports = app;