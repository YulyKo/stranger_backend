const db_propertis = require('../../db_propertis');

const name = 'plots_with_tags';
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

const REQUEST_STRING = `SELECT plots.title, plots.author, plots.text, plots.description,
locations.name as "location_name",
locations.photo_url as "location_photo_url",
locations.author as "location_author"
FROM plots 
left outer JOIN plot_tag ON plots.id = plot_tag.id_plot 
left outer JOIN plot_location ON plots.id = plot_location.id_plot 
left outer JOIN plot_person ON plots.id = plot_person.id_plot 
left outer JOIN locations ON locations.id = plot_location.id_location
left outer JOIN persons ON persons.id = plot_person.id_person`;

const getPlotsWithTagsAndLocations = (request, response) => {
  console.log('get plots_with_tags');
  db_propertis.pool.query(
    REQUEST_STRING, (error, results) => {
    if(error) { throw error }
    response.status(200).json(results.rows)
    // з цим можна працювати
    console.log(results.rows[0].title + " was I))");
  });
};

const getPlotWithTagsAndLocationsById = (request, response) => {
  console.log('get Plots With Tags by plot id');
  const id = parseInt(request.params.id);
  getPlotInfoById(id, response)
};

function getPlotInfoById(id_plot, response) {
    db_propertis.pool.query('SELECT title, description, text, author from plots WHERE id = $1', [id_plot], (error, result) => {
        if (error) { throw error }
        comparePlotToJSON(result.rows[0])
        getTagsByPlotId(id_plot, response);
    });
}

function getTagsByPlotId(id_plot, response) {
    db_propertis.pool.query(
        `SELECT tags.id, tags.name, tags.bg_color, tags.text_color FROM plot_tag JOIN tags ON tags.id = plot_tag.id_tag where plot_tag.id_plot = $1`,
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
        `SELECT persons.id, persons.name FROM plot_person Left JOIN persons ON persons.id = plot_person.id_person where plot_person.id_plot = $1`,
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
        `SELECT locations.id, locations.name, locations.photo_url, locations.author FROM plot_location Left JOIN locations ON locations.id = plot_location.id_location where plot_location.id_plot = $1`,
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

module.exports = {
    name,
    getPlotsWithTagsAndLocations,
    getPlotWithTagsAndLocationsById
};
