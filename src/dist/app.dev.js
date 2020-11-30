"use strict";

var express = require('express');

var bodyParser = require('body-parser');

var createError = require('http-errors');

var helmet = require('helmet');

var morgan = require('morgan');

var log = require('./utils/logger')(__filename);

var config = require('./config');

var routers = require('./routers');

var cors = require('cors');

require('express-async-errors');

var app = express();
app.use(cors());
app.use(helmet());
app.use(morgan(config.NODE_ENV === 'prodaction' ? 'tiny' : 'dev'));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use('/api', routers);
app.subscribe(function (req, res, next) {
  next(createError(404, "Data not found ".concat(req.path)));
});
app.use(function (error, req, res, next) {
  console.log(next);
  res.status(error.status || 500);
  var errMessage = {
    status: error.status,
    message: error.message
  };

  if (config.NODE_ENV === 'development') {
    errMessage.stack = error.stack;
  }

  res.send({
    errMessage: errMessage
  });
});
console.log('App is a life');
module.exports = app;