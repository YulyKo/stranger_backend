const db_propertis = require('../../db_properties');
const name = 'art_tag';

const get = (request, response) => {
  console.log('get art_tag');
  const REQUEST_STRING = `select * from tags where id_type = (select id from type_tags where type_name like 'art')`

  db_propertis.pool.query(REQUEST_STRING, (error, results) => {
    if(error) { throw error }
    response.status(200).json(results.rows)
  });
};

const getByArtId = (request, response) => {
  console.log('get art_tag by id');
  
  const id = parseInt(request.params.id);
  db_propertis.pool.query('SELECT * FROM art_tag WHERE id_art = $1', [id], (error, result) => {
    if (error) { throw error }
    response.status(200).json(result.rows);
  });
};

const post = (request, response) => {
  const { id_art, id_tag } = request.body;
  db_propertis.pool.query(
    'INSERT INTO art_tag( id_art, id_tag ) VALUES ($1, $2)',
    [ id_art, id_tag ], (error, results) => {
      if (error) { throw error }
      response.status(201).send(`Art to tag add with ID: ${results.insertId}`)
    }
  );
  console.log('add art_tag tag');
};


module.exports = {
  name,
  get,
  getByArtId,
  post,
};