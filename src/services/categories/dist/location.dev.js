"use strict";

var _require = require('../../db'),
    knex = _require.knex;

var getAllForPlots = function getAllForPlots() {
  var locations;
  return regeneratorRuntime.async(function getAllForPlots$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(knex('plot_location').select('plot_location.id_plot', 'plot_location.id_location', 'locations.name').leftJoin('locations', {
            'locations.id': 'plot_location.id_location'
          }));

        case 2:
          locations = _context.sent;
          return _context.abrupt("return", locations);

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