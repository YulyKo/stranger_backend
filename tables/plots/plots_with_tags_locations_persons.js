const db_properties = require('../../db_properties');
const _likes = require('../../common/_likes');
const _by_id = require('../../common/_by_id');

let plotsJSON = [];

const REQUEST_PLOT_INFO = `SELECT * FROM plots`;
const REQUEST_PLOT_TAGS = `SELECT plot_tag.id_plot, tags.id, tags.name, tags.bg_color, tags.text_color 
FROM plot_tag JOIN tags ON tags.id = plot_tag.id_tag`;
const REQUEST_PLOT_PERSONS = `SELECT plot_person.id_plot, persons.id, persons.name FROM plot_person 
Left JOIN persons ON persons.id = plot_person.id_person`;
const REQUEST_PLOT_LOCATIONS = `SELECT plot_location.id_plot, plot_location.id_location, locations.name, locations.photo_url, locations.author 
FROM plot_location LEFT JOIN locations ON locations.id = plot_location.id_location`;
const REQUEST_PLOT_USERS_LIKES = `SELECT * from user_likes_plot`;

const getPlotsWithTagsPersonsAndLocations = (request, response) => {
  db_properties.pool.query(REQUEST_PLOT_INFO, (error, result) => {
    if (error) { throw error }
    comparePlotInfoToJSON(result.rows)
    getPlotTags(response);
  });
}

function getPlotTags(response) {
  db_properties.pool.query(REQUEST_PLOT_TAGS, (error, result) => {
    if (error) { throw error }
    comparePlotTagsToJSON(result.rows)
    getPlotPersons(response);
  });
}

function getPlotPersons(response) {
  db_properties.pool.query(REQUEST_PLOT_PERSONS, (error, result) => {
    if (error) { throw error }
    comparePlotPersonsToJSON(result.rows)
    getPlotLocations(response);
  });
}

function getPlotLocations(response) {
  db_properties.pool.query(REQUEST_PLOT_LOCATIONS, (error, result) => {
    if (error) { throw error }
    comparePlotLocationsToJSON(result.rows)
    getPlotUserLikes(response)
  });
}

function getPlotUserLikes(response) {
  db_properties.pool.query(REQUEST_PLOT_USERS_LIKES, (error, result) => {
    if (error) { throw error }
    console.log(result.rows)
    comparePlotUsersLikesToJSON(result.rows)
    response.status(200).json(plotsJSON)
  });
}

function comparePlotInfoToJSON(plots) {
  for (let index = 0; index < plots.length; index++) {
    plotsJSON[index] = { // for all info
      "data": { //info for one
        "id": plots[index].id,
        "title": plots[index].title,
        "description": plots[index].description,
        "text": plots[index].text,
        "author": plots[index].author,
        "likes": plots[index].likes,
      },
      tags: [],
      locations: [],
      persons: [],
      users_likes: [],
    }
  }
}

function comparePlotLocationsToJSON(locations) {    
  for (let index_plot = 0; index_plot < plotsJSON.length; index_plot++) {
    for (let index_location = 0; index_location < locations.length; index_location++) {
      if (+plotsJSON[index_plot].data.id === +locations[index_location].id_plot) {
        let item = {
          "id": locations[index_location].id,
          "name": locations[index_location].name,
          "photo_url": locations[index_location].photo_url,
          "author": locations[index_location].author,
        };
        plotsJSON[index_plot].locations.push(item)
      }

    }
  }
}

function comparePlotPersonsToJSON(persons) {    
    for (let index_plot = 0; index_plot < plotsJSON.length; index_plot++) {
      for (let index_person = 0; index_person < persons.length; index_person++ ) {
        if (+plotsJSON[index_plot].data.id === +persons[index_person].id_plot) {
          let item = {
            "id": persons[index_person].id,
            "name": persons[index_person].name
          };
          plotsJSON[index_plot].persons.push(item)
        }
      }
    }
}

function comparePlotTagsToJSON(tags) {
  for (let index_plot = 0; index_plot < plotsJSON.length; index_plot++) {
    for (let index_tag = 0; index_tag < tags.length; index_tag++) {
      if (+plotsJSON[index_plot].data.id === +tags[index_tag].id_plot) {
        let item = {
          "id": tags[index_tag].id,
          "name": tags[index_tag].name,
          "bg_color": tags[index_tag].bg_color,
          "text_color": tags[index_tag].text_color,
        };
        plotsJSON[index_plot].tags.push(item)
      }
    }
  }
}

function comparePlotUsersLikesToJSON(likes) {
  for (let index_plot = 0; index_plot < plotsJSON.length; index_plot++) {
    for (let index = 0; index < likes.length; index++) {
      if (+plotsJSON[index_plot].data.id === +likes[index].plot_id) {
        plotsJSON[index_plot].users_likes.push(likes[index].user_login)
      }
    }
  }
}

function updateLikesInPlot(request, response) {
  const { likes } = request.body;
  const id = request.params.id;
  console.log(likes + ' | ' + id);
  _likes.update_likes('plots', likes, id)
}

function insertUserLikesPlot(request, response) {
  const { id, login } = request.body;
  console.log(login)
  let categoryName = _likes.categoryName('plots')
  _likes.insert_users_like(categoryName, login, id)
}

function deleteUserLikesPlot(request, response) {
  const { id } = request.body;
  let categoryName = _likes.categoryName('plots')
  _by_id.deleteInfoOfSmthById(categoryName, 'plot_id', id)
}

module.exports = {
  getPlotsWithTagsPersonsAndLocations,
  updateLikesInPlot,
  insertUserLikesPlot,
  deleteUserLikesPlot,
};
