"use strict";

var logger = require('../../utils/logger')(__filename);

var createError = require('http-errors');

var _require = require('../../services'),
    plot = _require.categories.plot;

var getAll = function getAll(req, res, next) {
  var allPlots;
  return regeneratorRuntime.async(function getAll$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          logger.info('get all lecturer plots');
          _context.next = 4;
          return regeneratorRuntime.awrap(plot.getAll());

        case 4:
          allPlots = _context.sent;
          console.log(allPlots);
          logger.info("found ".concat(allPlots.length));
          res.send(allPlots);
          _context.next = 14;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          logger.error(_context.t0.message);
          next(createError(500, _context.t0.message));

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 10]]);
};

module.exports = {
  getAll: getAll
};