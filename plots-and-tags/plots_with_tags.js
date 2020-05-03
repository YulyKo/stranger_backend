const db_propertis = require('../db_propertis');

const name = 'plots_with_tags';
let result;
const REQUEST_STRING = `SELECT plots.title, plots.author, plots.text, plots.description, tags.name as "tag_name", 
tags.text_color as "tag_text_color", 
tags.bg_color as "tag_bg_color",
locations.name as "location_name",
locations.photo_url as "location_photo_url",
locations.author as "location_author"
FROM plots 
left outer JOIN plot_tag ON plots.id = plot_tag.id_plot 
left outer JOIN plot_location ON plots.id = plot_location.id_plot 
left outer JOIN plot_person ON plots.id = plot_person.id_plot 
left outer JOIN tags ON tags.id = plot_tag.id_tag
left outer JOIN locations ON locations.id = plot_location.id_location
left outer JOIN persons ON persons.id = plot_person.id_person`;

const getPlotsWithTagsAndLocations = (request, response) => {
  console.log('get plots_with_tags');
  db_propertis.pool.query(
    REQUEST_STRING, (error, results) => {
    if(error) { throw error }
    response.status(200).json(results.rows)
    // з цим можна працювати
    console.log(results.rows[0].title + " iwas I))");
  });
};

const getPlotWithTagsAndLocationsById = (request, response) => {
  console.log('get Plots With Tags by plot id');
  
  const id = parseInt(request.params.id);
  db_propertis.pool.query(REQUEST_STRING + ' WHERE plots.id = $1', [id], (error, result) => {
    if (error) { throw error }
    response.status(200).json(result.rows);
  });
};

module.exports = {
    name,
    getPlotsWithTagsAndLocations,
    getPlotWithTagsAndLocationsById
};
