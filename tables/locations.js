const db_properties = require('../db_properties');
const _by_id = require("../common/_by_id");

const post = (request, response) => {
  const { author, name, photo_url } = request.body;
  db_properties.pool.query(
    'INSERT INTO locations( author, name, photo_url ) VALUES ($1, $2, $3)',
    [author, name, photo_url], (error, results) => {
      if (error) { console.log(error.message) }
      response.status(201).send(`Plot add with ID: ${results.insertId}`)
    }
  );
};

const del = (request) => {
  const id = parseInt(request.params.id)
  _by_id.deleteInfoOfSmthById('plot_location', 'id_location', id)
  _by_id.deleteInfoOfSmthById('locations', 'id', id)
};

const get = (request, response) => {
  db_properties.pool.query('SELECT * FROM locations', (error, results) => {
    if (error) { console.log(error.message) }
    response.status(200).json(results.rows)
  });
};
  
const getById = (request, response) => {
  const id = parseInt(request.params.id);
  db_properties.pool.query('SELECT * FROM locations WHERE id = $1', [id], (error, result) => {
    if (error) { console.log(error.message) }
    response.status(200).json(result.rows);
  });
};

module.exports = {
  get,
  getById,
  post,
  del,
};
