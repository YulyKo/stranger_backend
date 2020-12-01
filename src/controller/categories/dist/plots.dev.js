"use strict";

var logger = require('../../utils/logger')(__filename);

var createError = require('http-errors');

var _require = require('../../services'),
    plot = _require.categories.plot;

var tag = require('../../services/categories/tag');

var getAll = function getAll(req, res, next) {
  var allPlots, tags;
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
          _context.next = 7;
          return regeneratorRuntime.awrap(tag.getTagsForPlots());

        case 7:
          tags = _context.sent;
          logger.info("found ".concat(allPlots.length));
          res.send(tags);
          _context.next = 16;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](0);
          logger.error(_context.t0.message);
          next(createError(500, _context.t0.message));

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 12]]);
};

module.exports = {
  getAll: getAll
};