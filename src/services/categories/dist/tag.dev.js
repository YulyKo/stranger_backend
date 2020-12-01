"use strict";

var _require = require('../../db'),
    knex = _require.knex;

var getTagsForPlots = function getTagsForPlots() {
  var tags;
  return regeneratorRuntime.async(function getTagsForPlots$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(knex('plot_tag').select('plot_tag.id_plot', 'tags.id', 'tags.name', 'tags.bg_color', 'tags.text_color').join('tags', {
            'tags.id': 'plot_tag.id_tag'
          }));

        case 2:
          tags = _context.sent;
          return _context.abrupt("return", tags);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports = {
  getTagsForPlots: getTagsForPlots
};