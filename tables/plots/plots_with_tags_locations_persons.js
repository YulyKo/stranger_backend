const db_propertis = require('../../db_propertis');

const name = 'plots_with_tags_persons_locations';

let plotsJSON = [];

const REQUEST_PLOT_INFO = `SELECT id, title, description, text, author FROM plots`;
const REQUEST_PLOT_TAGS = `SELECT plot_tag.id_plot, tags.id, tags.name, tags.bg_color, tags.text_color 
FROM plot_tag JOIN tags ON tags.id = plot_tag.id_tag`;
const REQUEST_PLOT_PERSONS = `SELECT plot_person.id_plot, persons.id, persons.name FROM plot_person 
Left JOIN persons ON persons.id = plot_person.id_person`;
const REQUEST_PLOT_LOCATIONS = `SELECT plot_location.id_plot, plot_location.id_location , locations.name, locations.photo_url, locations.author 
FROM plot_location LEFT JOIN locations ON locations.id = plot_location.id_location`;

const getPlotsWithTagsPersonsAndLocations = (request, response) => {
  console.log('get plots_with_tags');
    console.log(typeof response)
    db_propertis.pool.query(REQUEST_PLOT_INFO, (error, result) => {
      if (error) { throw error }
      comparePlotInfoToJSON(result.rows)
      getPlotTags(response);
    });
}

function getPlotTags(response) {
  db_propertis.pool.query(REQUEST_PLOT_TAGS, (error, result) => {
    if (error) { throw error }
    comparePlotTagsToJSON(result.rows)
    getPlotPersons(response);
  });
}

function getPlotPersons(response) {
  db_propertis.pool.query(REQUEST_PLOT_PERSONS, (error, result) => {
    if (error) { throw error }
    comparePlotPersonsToJSON(result.rows)
    getPlotLocations(response);
  });
}

function getPlotLocations(response) {
  db_propertis.pool.query(REQUEST_PLOT_LOCATIONS, (error, result) => {
    if (error) { throw error }
    comparePlotLocationsToJSON(result.rows)

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
      },
      tags: [],
      locations: [],
      persons: [],
    }
  }
}

function comparePlotLocationsToJSON(locations) {    
    for (let index = 0; index < locations.length; index++) {        
        if (+plotsJSON[index].data.id === +locations[index].id_plot) {
            let item = {
                "id": locations[index].id,
                "name": locations[index].name,
                "photo_url": locations[index].photo_url,
                "author": locations[index].author, 
            };
            plotsJSON[index].locations.push(item)
        }
    }
}

function comparePlotPersonsToJSON(persons) {    
    for (let index = 0; index < persons.length; index++) {        
        if (+plotsJSON[index].data.id === +persons[index].id_plot) {
            let item = {
                "id": persons[index].id,
                "name": persons[index].name
            };
            plotsJSON[index].persons.push(item)
        }
    }
}

function comparePlotTagsToJSON(tags) {
    for (let index = 0; index < tags.length; index++) {
        if (+plotsJSON[index].data.id === +tags[index].id_plot) {
            let item = {
                "id": tags[index].id,
                "name": tags[index].name,
                "bg_color": tags[index].bg_color,
                "text_color": tags[index].text_color, 
            };
            plotsJSON[index].tags.push(item)
        }
    }
}


module.exports = {
    name,
    getPlotsWithTagsPersonsAndLocations,
};
