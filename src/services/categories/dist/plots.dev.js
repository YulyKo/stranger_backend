"use strict";

var _require = require('../../db'),
    knex = _require.knex;

var getAll = function getAll() {
  var plots;
  return regeneratorRuntime.async(function getAll$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(knex('plots').join('tags', {
            'tags.id': 'plot_tag.id_tag'
          }).leftJoin('persons', {
            'persons.id': 'plot_person.id'
          }).leftJoin('locations', {
            'locations': 'plot_location.id'
          }).select('plots.id', 'plots.title', 'plots.description', 'plots.text', 'plots.autor', 'plots.likes'));

        case 2:
          plots = _context.sent;
          return _context.abrupt("return", plots);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports = {
  getAll: getAll
};