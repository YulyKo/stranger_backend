"use strict";

/* eslint-disable no-unused-vars */
var logger = require('../../../utils/logger')(__filename);

var createError = require('http-errors');

var _require = require('../../../services'),
    _require$categories = _require.categories,
    plot = _require$categories.plot,
    tag = _require$categories.tag,
    location = _require$categories.location,
    person = _require$categories.person,
    preference = _require$categories.preference;

var plotsJSON = [];

function getPlotTags(res) {
  var tags;
  return regeneratorRuntime.async(function getPlotTags$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(tag.getTagsForPlots());

        case 2:
          tags = _context.sent;
          comparePlotTagsToJSON(tags);
          getPlotPersons(res);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
}

function getPlotPersons(res) {
  var persons;
  return regeneratorRuntime.async(function getPlotPersons$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(person.getAllForPlots());

        case 2:
          persons = _context2.sent;
          comparePlotPersonsToJSON(persons);
          getPlotLocations(res);

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function getPlotLocations(res) {
  var locations;
  return regeneratorRuntime.async(function getPlotLocations$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(location.getAllForPlots());

        case 2:
          locations = _context3.sent;
          comparePlotLocationsToJSON(locations);
          getPlotUserLikes(res);

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  });
}

function getPlotUserLikes(res) {
  var preferences;
  return regeneratorRuntime.async(function getPlotUserLikes$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(preference.getAllForPlots());

        case 2:
          preferences = _context4.sent;
          comparePlotUsersLikesToJSON(preferences);
          res.status(200).json(plotsJSON);

        case 5:
        case "end":
          return _context4.stop();
      }
    }
  });
}

function comparePlotInfoToJSON(plots) {
  for (var index = 0; index < plots.length; index++) {
    plotsJSON[index] = {
      // for all info
      'data': {
        //info for one
        'id': plots[index].id,
        'title': plots[index].title,
        'description': plots[index].description,
        'text': plots[index].text,
        'author': plots[index].author,
        'likes': plots[index].likes
      },
      tags: [],
      locations: [],
      persons: [],
      users_likes: []
    };
  }
}

function comparePlotLocationsToJSON(locations) {
  for (var index_plot = 0; index_plot < plotsJSON.length; index_plot++) {
    for (var index_location = 0; index_location < locations.length; index_location++) {
      if (+plotsJSON[index_plot].data.id === +locations[index_location].id_plot) {
        var item = {
          'id': locations[index_location].id,
          'name': locations[index_location].name,
          'photo_url': locations[index_location].photo_url,
          'author': locations[index_location].author
        };
        plotsJSON[index_plot].locations.push(item);
      }
    }
  }
}

function comparePlotPersonsToJSON(persons) {
  for (var index_plot = 0; index_plot < plotsJSON.length; index_plot++) {
    for (var index_person = 0; index_person < persons.length; index_person++) {
      if (+plotsJSON[index_plot].data.id === +persons[index_person].id_plot) {
        var item = {
          'id': persons[index_person].id,
          'name': persons[index_person].name
        };
        plotsJSON[index_plot].persons.push(item);
      }
    }
  }
}

function comparePlotTagsToJSON(tags) {
  for (var index_plot = 0; index_plot < plotsJSON.length; index_plot++) {
    for (var index_tag = 0; index_tag < tags.length; index_tag++) {
      if (+plotsJSON[index_plot].data.id === +tags[index_tag].id_plot) {
        var item = {
          'id': tags[index_tag].id,
          'name': tags[index_tag].name,
          'bg_color': tags[index_tag].bg_color,
          'text_color': tags[index_tag].text_color
        };
        plotsJSON[index_plot].tags.push(item);
      }
    }
  }
}

function comparePlotUsersLikesToJSON(likes) {
  for (var index_plot = 0; index_plot < plotsJSON.length; index_plot++) {
    for (var index = 0; index < likes.length; index++) {
      if (+plotsJSON[index_plot].data.id === +likes[index].plot_id) {
        plotsJSON[index_plot].users_likes.push(likes[index].user_login);
      }
    }
  }
}

var getAllPlots = function getAllPlots(req, res, next) {
  var allPlots;
  return regeneratorRuntime.async(function getAllPlots$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          logger.info('get all lecturer plots');
          _context5.next = 4;
          return regeneratorRuntime.awrap(plot.getAll());

        case 4:
          allPlots = _context5.sent;
          comparePlotInfoToJSON(allPlots);
          getPlotTags(res);
          logger.info("found ".concat(allPlots.length)); // res.status(200).json(plotsJSON);

          _context5.next = 14;
          break;

        case 10:
          _context5.prev = 10;
          _context5.t0 = _context5["catch"](0);
          logger.error(_context5.t0.message);
          next(createError(500, _context5.t0.message));

        case 14:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 10]]);
};

module.exports = {
  getAllPlots: getAllPlots
};