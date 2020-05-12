const db_propertis = require('../db_properties');

const name = 'relationships';

const post = (request, response) => {
  const { id_person, id_person2, id_type_relationship } = request.body;
  db_propertis.pool.query(
    'INSERT INTO relationships ( id_person, id_person2, id_type_relationship ) VALUES ($1, $2, $3)',
    [id_person, id_person2, id_type_relationship], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`relationship add with ID: ${results.insertId}`)
    }
  );
  console.log('add relationship');
};

const del = (request, response) => {
  const id = parseInt(request.params.id)

  db_propertis.pool.query('DELETE FROM relationships WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Location deleted with ID: ${id}`)
  });
};


const update = (request, response) => {
  const id = parseInt(request.params.id)
  const { id_person, id_person2, id_type_relationship } = request.body

  db_propertis.pool.query(
    'UPDATE relationships SET id_person = $1, id_person2 = $2, id_type_relationship = $3 WHERE id = $4',
    [id_person, id_person2, id_type_relationship, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Location modified with ID: ${id}`)
    }
  )
}

const get = (request, response) => {
  console.log('get plots');

  db_propertis.pool.query('SELECT * FROM relationships', (error, results) => {
    if(error) throw error
    response.status(200).json(results.rows)
  });
};

const getById = (request, response) => {
  console.log('get location by id');

  const id = parseInt(request.params.id);
  db_propertis.pool.query('SELECT * FROM relationships WHERE id = $1', [id], (error, result) => {
    if (error) { throw error }
    response.status(200).json(result.rows);
  });
};

module.exports = {
  name,
  get,
  getById,
  del,
  update,
  post,
};
