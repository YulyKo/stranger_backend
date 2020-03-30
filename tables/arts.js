const db_propertis = require('./../db_propertis');

const name = 'arts';

const post = (request, response) => {
  const { author, title, description, url } = request.body;
  db_propertis.pool.query(
    'INSERT INTO arts( author, title, description, url ) VALUES ($1, $2, $3, $4)',
    [ author, title, description, url ], (error, results) => {
      if (error) {
        throw error
        //  id | author | title | description | url
      }
      response.status(201).send(`Art add with ID: ${results.insertId}`)
    }
  );
  console.log('add plot tag');
};


const del = (request, response) => {
  const id = parseInt(request.params.id)
  db_propertis.pool.query('DELETE FROM arts WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Art deleted with ID: ${id}`)
  });
};

const update = (request, response) => {
  const id = parseInt(request.params.id)
  const { author, title, description, url } = request.body
  // author, name, photo_url
  db_propertis.pool.query(
    'UPDATE arts SET author = $1, title = $2, description = $3, url = $4 WHERE id = $4',
    [ author, title, description, url ],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Art modified with ID: ${id}`)
    }
  )
}

const get = (request, response) => {
  console.log('get plots');

  db_propertis.pool.query('SELECT * FROM arts', (error, results) => {
    if(error) throw error
    response.status(200).json(results.rows)
  });
};

const getById = (request, response) => {
  console.log('get art by id');
  
  const id = parseInt(request.params.id);
  db_propertis.pool.query('SELECT * FROM arts WHERE id = $1', [id], (error, result) => {
    if (error) { throw error }
    response.status(200).json(result.rows);
  });
};

module.exports = {
  name,
  get,
  getById,
  post,
  del,
  update,
};
