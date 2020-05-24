const db_propertis = require('../../db_properties');

const name = 'plot_tag';

const get = (request, response) => {
  console.log('get plot_tag');

  db_propertis.pool.query("SELECT id, name, bg_color, text_color FROM tags WHERE id_type IN (SELECT id from type_tags where type_name = 'plot');", (error, results) => {
    if(error) { throw error }
    response.status(200).json(results.rows)
  });
};

const getByIdForPlot = (request, response) => {
  console.log('get plot_tag by id');
  // for select all tags for plot
  // 
  const id = parseInt(request.params.id);
  db_propertis.pool.query("SELECT name, bg_color, text_color FROM tags WHERE id IN (SELECT id_tag from plot_tag where id_plot = $1)", [id], (error, result) => {
    if (error) { throw error }
    response.status(200).json(result.rows);
  });
};

module.exports = {
  name,
  get,
  getByIdForPlot,
};