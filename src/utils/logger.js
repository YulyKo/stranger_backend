const pino = require('pino');

module.exports = name =>
  pino({ prettyPrint: { colorize: true, translateTime: true } }).child({
    filename: name
  });
