const db_propertis = require('../db_propertis');

const name = 'plots_with_tags';
let result;
const REQUEST_STRING = `SELECT plots.id, plots.title, plots.author, plots.text, plots.description, tags.name as "tag_name", 
tags.text_color as "tag_text_color", 
tags.bg_color as "tag_bg_color",
locations.name as "location_name",
locations.photo_url as "location_photo_url",
locations.author as "location_author"
FROM plots 
left outer JOIN plot_tag ON plots.id = plot_tag.id_plot 
left outer JOIN tags ON tags.id = plot_tag.id_tag
left outer join locations on locations.id = plots.id_location`;

const getPlotsWithTagsAndLocations = (request, response) => {
  console.log('get plots_with_tags');
  db_propertis.pool.query(
    REQUEST_STRING, (error, results) => {
    if(error) { throw error }
    response.status(200).json(results.rows)
  });
};

const getPlotsWithTagsAndLocationsById = (request, response) => {
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
    getPlotsWithTagsAndLocationsById
};
