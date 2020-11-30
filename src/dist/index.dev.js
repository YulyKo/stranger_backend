"use strict";

var http = require('http');

var config = require('./config');

var log = require('./utils/logger')(__filename);

var app = require('./app');

var _require = require('./db'),
    knex = _require.knex;

var server = http.createServer(app);
knex.raw('select 1+1 as result').then(function () {
  server.listen(config.PORT, function () {
    log.info("Server running at ".concat(config.HOST, " port ").concat(config.PORT));
  });
})["catch"](function (err) {
  log.error('system error', err);
  process.exit(1);
});