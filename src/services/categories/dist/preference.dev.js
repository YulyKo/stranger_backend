"use strict";

var _require = require('../../db'),
    knex = _require.knex;

var getAllForPlots = function getAllForPlots() {
  var prefences;
  return regeneratorRuntime.async(function getAllForPlots$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(knex('user_likes_plot').select('*'));

        case 2:
          prefences = _context.sent;
          return _context.abrupt("return", prefences);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports = {
  getAllForPlots: getAllForPlots
};