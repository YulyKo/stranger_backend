const db_properties = require('../db_properties');
const _by_id = require('./../common/_by_id')

const name = 'locations';

const post = (request, response) => {
  const { author, name, photo_url } = request.body;
  db_properties.pool.query(
    'INSERT INTO locations( author, name, photo_url ) VALUES ($1, $2, $3)',
    [author, name, photo_url], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Plot add with ID: ${results.insertId}`)
    }
  );
  console.log('add location');
};

const del = (request, response) => {
  const id = parseInt(request.params.id)
  deleteLocationFromTable(id)
  console.log('location' + id);
};

function deleteLocationFromTable(id) {
  db_properties.pool.query(`DELETE FROM plot_location WHERE id_location = $1;`, [id], (error) => {
    if (error) { throw error }
  });
  deleteFromPlotLocationTable(id)
  console.log('location ' + id);
}

function deleteFromPlotLocationTable(id) {
  db_properties.pool.query(`DELETE FROM locations WHERE id = $1;`, [id], (error) => {
    if (error) { throw error }
    console.log('location ' + id);
  });
}

const update = (request, response) => {
  const id = parseInt(request.params, id)
  const { author, name, photo_url } = request.body
// author, name, photo_url
  db_properties.pool.query(
    'UPDATE locations SET author = $1, name = $2, photo_url = $3 WHERE id = $4',
    [author, name, photo_url, id],
    (error, results) => {
      if (error) {
          throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  );
};

const get = (request, response) => {
  console.log('get locations');

  db_properties.pool.query('SELECT * FROM locations', (error, results) => {
    if(error) { throw error }
    response.status(200).json(results.rows)
  });
};
  
const getById = (request, response) => {
  console.log('location get by id');
  
  const id = parseInt(request.params.id);
  db_properties.pool.query('SELECT * FROM locations WHERE id = $1', [id], (error, result) => {
    if (error) { throw error }
    response.status(200).json(result.rows);
  });
};

module.exports = {
  name,
  get,
  getById,
  post,
  update,
  del,
};
