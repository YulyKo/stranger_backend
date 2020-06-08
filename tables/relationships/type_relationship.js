const db_propertis = require('../../db_properties');
const _by_id = require('../../common/_by_id')

const get = (request, response) => {
  db_propertis.pool.query('SELECT * FROM type_relationship', (error, results) => {
    if(error) { console.log(error.message) }
    response.status(200).json(results.rows)
  });
};

const post = (request, response) => {
  const { name } = request.body;
  db_propertis.pool.query(
    `INSERT INTO type_relationship ( name ) VALUES ($1)`,
    [name], (error, results) => {
      if (error) { console.log(error.message) }
      response.status(201).send(`type relationship add with ID: ${results.insertId}`)
    }
  );
};

const del = (request, response) => {
  const { id } = request.params;
  _by_id.deleteInfoOfSmthById('relationships', 'id_type_relationship', id );
  _by_id.deleteInfoOfSmthById('type_relationship', 'id', id );
};

module.exports = {
  get,
  post,
  del,
};