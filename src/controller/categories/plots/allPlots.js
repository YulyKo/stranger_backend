/* eslint-disable no-unused-vars */
const logger = require('../../../utils/logger')(__filename);
const createError = require('http-errors');
const {
  categories: { plot, tag, location, person, preference }
} = require('../../../services');

let plotsJSON = [];

async function getPlotTags(res) {
  const tags = await tag.getTagsForPlots();
  comparePlotTagsToJSON(tags);
  getPlotPersons(res);
}

async function getPlotPersons(res) {
  const persons = await person.getAllForPlots();
  comparePlotPersonsToJSON(persons);
  getPlotLocations(res);
}

async function getPlotLocations(res) {
  const locations = await location.getAllForPlots();
  comparePlotLocationsToJSON(locations);
  getPlotUserLikes(res);
}

async function getPlotUserLikes(res) {
  const preferences = await preference.getAllForPlots();
  comparePlotUsersLikesToJSON(preferences);
  res.status(200).json(plotsJSON);
}

function comparePlotInfoToJSON(plots) {
  for (let index = 0; index < plots.length; index++) {
    plotsJSON[index] = { // for all info
      'data': { //info for one
        'id': plots[index].id,
        'title': plots[index].title,
        'description': plots[index].description,
        'text': plots[index].text,
        'author': plots[index].author,
        'likes': plots[index].likes,
      },
      tags: [],
      locations: [],
      persons: [],
      users_likes: [],
    };
  }
}

function comparePlotLocationsToJSON(locations) {    
  for (let index_plot = 0; index_plot < plotsJSON.length; index_plot++) {
    for (let index_location = 0; index_location < locations.length; index_location++) {
      if (+plotsJSON[index_plot].data.id === +locations[index_location].id_plot) {
        let item = {
          'id': locations[index_location].id,
          'name': locations[index_location].name,
          'photo_url': locations[index_location].photo_url,
          'author': locations[index_location].author,
        };
        plotsJSON[index_plot].locations.push(item);
      }

    }
  }
}

function comparePlotPersonsToJSON(persons) {    
    for (let index_plot = 0; index_plot < plotsJSON.length; index_plot++) {
      for (let index_person = 0; index_person < persons.length; index_person++ ) {
        if (+plotsJSON[index_plot].data.id === +persons[index_person].id_plot) {
          let item = {
            'id': persons[index_person].id,
            'name': persons[index_person].name
          };
          plotsJSON[index_plot].persons.push(item);
        }
      }
    }
}

function comparePlotTagsToJSON(tags) {
  for (let index_plot = 0; index_plot < plotsJSON.length; index_plot++) {
    for (let index_tag = 0; index_tag < tags.length; index_tag++) {
      if (+plotsJSON[index_plot].data.id === +tags[index_tag].id_plot) {
        let item = {
          'id': tags[index_tag].id,
          'name': tags[index_tag].name,
          'bg_color': tags[index_tag].bg_color,
          'text_color': tags[index_tag].text_color,
        };
        plotsJSON[index_plot].tags.push(item);
      }
    }
  }
}

function comparePlotUsersLikesToJSON(likes) {
  for (let index_plot = 0; index_plot < plotsJSON.length; index_plot++) {
    for (let index = 0; index < likes.length; index++) {
      if (+plotsJSON[index_plot].data.id === +likes[index].plot_id) {
        plotsJSON[index_plot].users_likes.push(likes[index].user_login);
      }
    }
  }
}

const getAllPlots = async (req, res, next) => {
  try {
    logger.info('get all lecturer plots');
    const allPlots = await plot.getAll();
    comparePlotInfoToJSON(allPlots);
    getPlotTags(res);
    logger.info(`found ${allPlots.length}`);
    
    // res.status(200).json(plotsJSON);
  } catch (error) {
    logger.error(error.message);
    next(createError(500, error.message));
  }
};

module.exports = { getAllPlots };
