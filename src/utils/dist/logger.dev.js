"use strict";

var pino = require('pino');

module.exports = function (name) {
  return pino({
    prettyPrint: {
      colorize: true,
      translateTime: true
    }
  }).child({
    filename: name
  });
};