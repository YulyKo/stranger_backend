"use strict";

var _require = require('../../db'),
    knex = _require.knex;

var getAllForPlots = function getAllForPlots() {
  var persons;
  return regeneratorRuntime.async(function getAllForPlots$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(knex('plot_person').select('plot_person.id_plot', 'persons.id', 'persons.name').leftJoin('persons', {
            'persons.id': 'plot_person.id_person'
          }));

        case 2:
          persons = _context.sent;
          return _context.abrupt("return", persons);

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