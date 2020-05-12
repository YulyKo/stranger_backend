const db_propertis = require('../db_properties');

const name = 'type_tags';

const get = (request, response) => {
  console.log('get type tags');

  db_propertis.pool.query('SELECT * FROM type_tags', (error, results) => {
    if(error) throw error
    response.status(200).json(results.rows)
  });
};

module.exports = {
  get,
  name,
};