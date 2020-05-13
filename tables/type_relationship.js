const db_propertis = require('../db_properties');

const name = 'type_relationship';

const get = (request, response) => {
  console.log('get type relationships');

  db_propertis.pool.query('SELECT * FROM type_relationship', (error, results) => {
    if(error) { throw error }
    response.status(200).json(results.rows)
  });
};

const getById = (request, response) => {
  console.log('get type_relationships by id');

  const id = parseInt(request.params.id);
  db_propertis.pool.query('SELECT * FROM type_relationship WHERE id = $1',
  [id], (error, result) => {
    if (error) { throw error }
    response.status(200).json(result.rows);
  });
};

const post = (request, response) => {
  const { name } = request.body;
  console.log(request.body);
  if (!name) {
    console.log('error');
  } else {
    db_propertis.pool.query(
      `INSERT INTO type_relationship ( name ) VALUES ($1)`,
      [name], (error, results) => {
        if (error) {
          throw error
        }
        response.status(201).send(`type relationship add with ID: ${results.insertId}`)
      }
    );
  }
  console.log('add type_relationship');
};

module.exports = {
  name,
  get,
  post,
  getById,
};