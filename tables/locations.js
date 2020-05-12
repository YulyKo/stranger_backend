const db_propertis = require('../db_properties');

const name = 'locations';

const post = (request, response) => {
  const { author, name, photo_url } = request.body;
  db_propertis.pool.query(
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

  db_propertis.pool.query('DELETE FROM locations WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`location deleted with ID: ${id}`)
  });
};


const update = (request, response) => {
  const id = parseInt(request.params, id)
  const { author, name, photo_url } = request.body
// author, name, photo_url
  db_propertis.pool.query(
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

  db_propertis.pool.query('SELECT * FROM locations', (error, results) => {
    if(error) { throw error }
    response.status(200).json(results.rows)
  });
};
  
const getById = (request, response) => {
  console.log('location get by id');
  
  const id = parseInt(request.params.id);
  db_propertis.pool.query('SELECT * FROM locations WHERE id = $1', [id], (error, result) => {
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
