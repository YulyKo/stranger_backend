const db_propertis = require('./../db_propertis');

const name = 'plots';

const post = (request, response) => {
  const { author, title, text, id_location, id_person } = request.body;
  db_propertis.pool.query(
    'INSERT INTO plots( author, title, text, id_location, id_person ) VALUES ($1, $2, $3, $4, $5)',
    [author, title, text, id_location, id_person], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Plot add with ID: ${results.insertId}`)
    }
  );
  console.log('add plot');
};

const del = (request, response) => {
  const id = parseInt(request.params.id)

  db_propertis.pool.query('DELETE FROM plots WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Plot deleted with ID: ${id}`)
  });
};

const update = (request, response) => {
  const id = parseInt(request.params.id)
  const { author, title, text, id_location, id_person } = request.body
// author, title, text, id_location, id_person
  db_propertis.pool.query(
    'UPDATE plots SET author = $1, title = $2, text = $3, id_location = $4, id_person = $5 WHERE id = $6',
    [author, title, text, id_location, id_person, id],
    (error, results) => {
      if (error) {
          throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const get = (request, response) => {
  console.log('get plots');

  db_propertis.pool.query('SELECT * FROM plots', (error, results) => {
    if(error) { throw error }
    response.status(200).json(results.rows)
  });
};

const getById = (request, response) => {
  console.log('get by id');

  const id = parseInt(request.params.id);
  db_propertis.pool.query('SELECT * FROM plots WHERE id = $1', [id], (error, result) => {
      if (error) { throw error }
      response.status(200).json(result.rows);
  });
};

module.exports = {
  name,
  get,
  getById,
  update,
  del,
  post,
}
