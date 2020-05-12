const db_propertis = require('../../db_properties');

const name = 'plot_by_id_with_all_data';

const REQUEST_PLOT_INFO = `SELECT title, description, text, author FROM plots`;
const REQUEST_PLOT_TAGS = `SELECT tags.id, tags.name, tags.bg_color, tags.text_color FROM plot_tag JOIN tags ON tags.id = plot_tag.id_tag`;
const REQUEST_PLOT_PERSONS = `SELECT persons.id, persons.name FROM plot_person Left JOIN persons ON persons.id = plot_person.id_person`;
const REQUEST_PLOT_LOCATIONS = `SELECT locations.id , locations.name, locations.photo_url, locations.author FROM plot_location LEFT JOIN locations ON locations.id = plot_location.id_location`;

let resultJSON = {
  "plot": {
    "data": {
      "title": "",
      "description": "",
      "text": "",
      "author": ""
    },
    "tags": [],
    "locations": [],
    "persons": [],
  }
};

const getPlotWithTagsAndLocationsById = (request, response) => {
  console.log('get Plots With Tags by plot id');
  const id = parseInt(request.params.id);
  getPlotInfoById(id, response)
};
  
function getPlotInfoById(id_plot, response) {
  db_propertis.pool.query(REQUEST_PLOT_INFO + ' WHERE id = $1', [id_plot], (error, result) => {
    if (error) { throw error }
    comparePlotToJSON(result.rows[0])
    getTagsByPlotId(id_plot, response);
  });
}
  
function getTagsByPlotId(id_plot, response) {
  db_propertis.pool.query(
    REQUEST_PLOT_TAGS + ` WHERE plot_tag.id_plot = $1`,
    [id_plot], (error, results) => {
      if (error) { throw error }
      let res = results.rows
      compareTagsToJSON(res)
      getPersonsByPlotId(id_plot, response)
    }
  )
}
  
function getPersonsByPlotId(id_plot, response) {
  db_propertis.pool.query(
    REQUEST_PLOT_PERSONS + ` WHERE plot_person.id_plot = $1`,
    [id_plot], (error, results) => {
      if (error) { throw error }
      let res = results.rows
      comparePersonsToJSON(res);
      getLocationsByPlotId(id_plot, response)
     }
  )
}
  
function getLocationsByPlotId(id_plot, response) {
  db_propertis.pool.query(
    REQUEST_PLOT_LOCATIONS + ` WHERE plot_location.id_plot = $1`,
    [id_plot], (error, results) => {
      if (error) { throw error }
      let res = results.rows
      compareLocationsToJSON(res)

      response.status(200).json(resultJSON)
    }
  )
}
  
function comparePlotToJSON(data) {
  resultJSON.plot.data.title = data.title
  resultJSON.plot.data.author = data.author
  resultJSON.plot.data.description = data.description
  resultJSON.plot.data.text = data.text
}
  
function comparePersonsToJSON(data) {
  for (let i = 0; i < data.length; i++) {
    let item = {
      "id": data[i].id,
      "name": data[i].name
    };
    resultJSON.plot.persons.push(item);
  }
}
  
function compareLocationsToJSON(data) {
  for (let i = 0; i < data.length; i++) {
    let item = {
      "id": data[i].id,
      "name": data[i].name,
      "photo_url": data[i].photo_url,
      "author": data[i].author
    };
    resultJSON.plot.locations.push(item);
  }
}
  
function compareTagsToJSON(data) {
  for (let i = 0; i < data.length; i++) {
    let item = {
      "id": data[i].id,
      "name": data[i].name,
      "bg_color": data[i].bg_color,
      "text_color": data[i].text_color
    };
    resultJSON.plot.tags.push(item)
  }
}

const deleteWithTagsLocationsPersons = (request) => {
  const id = parseInt(request.params.id)
  console.log('delete plot')
  deleteInfoOfPlotById('plot_tag', 'id_plot', id)
  deleteInfoOfPlotById('plot_location', 'id_plot', id)
  deleteInfoOfPlotById('plot_person', 'id_plot', id)
  deleteInfoOfPlotById('plots', 'id', id)
};

function deleteInfoOfPlotById(nameOfTable, nameOfColumn, id_plot) {
  db_propertis.pool.query(`DELETE FROM ${nameOfTable} WHERE ${nameOfColumn} = $1;`, [id_plot], (error) => {
    if (error) {
      throw error
    }
  });
}

module.exports = {
  name,
  getPlotWithTagsAndLocationsById,
  deleteWithTagsLocationsPersons
};
