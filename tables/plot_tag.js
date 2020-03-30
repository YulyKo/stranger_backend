const db_propertis = require('./../db_propertis');

const name = 'plot_tag';

const get = (request, response) => {
  console.log('get plot_tag');

  db_propertis.pool.query("SELECT name, bg_color, text_color FROM tags WHERE id_type IN (SELECT id from type_tags where type_name = 'plot');", (error, results) => {
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

const post = (request, response) => {
  const { id_plot, id_tag } = request.body;
  db_propertis.pool.query(
    'INSERT INTO plot_tag( id_plot, id_tag ) VALUES ($1, $2)',
    [ id_plot, id_tag ], (error, results) => {
      if (error) { throw error }
      response.status(201).send(`Art add with ID: ${results.insertId}`)
    }
  );
  console.log('add plot tag');
};



module.exports = {
  name,
  get,
  getByIdForPlot,
  post,
};