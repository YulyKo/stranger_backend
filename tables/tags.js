const db_propertis = require('./../db_propertis');

const name = 'tags';

const post = (request, response) => {
  const { id_type, author, name, bg_color, text_color } = request.body;
  db_propertis.pool.query(
    'INSERT INTO tags( id_type, author, name, bg_color, text_color ) VALUES ($1, $2, $3, $4, $5)',
    [id_type, author, name, bg_color, text_color], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Plot add with ID: ${results.insertId}`)
    }
  );
  console.log('add plot tag');
};

const del = (request, response) => {
  const id = parseInt(request.params.id)

  db_propertis.pool.query('DELETE FROM tags WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Tag deleted with ID: ${id}`)
  });
};
  
  
const update = (request, response) => {
  const id = parseInt(request.params.id)
  const { author, title, text, id_location, id_person } = request.body
// author, title, text, id_location, id_person
  db_propertis.pool.query(
      // id_type, author, name, bg_color, text_color
    'UPDATE tags SET id_type = $1, author = $2, name = $3, bg_color = $4, text_color = $5 WHERE id = $6',
    [id_type, author, name, bg_color, text_color],
    (error, results) => {
      if (error) {
          throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}
  
const get = (request, response) => {
  console.log('get tags');

  db_propertis.pool.query('SELECT * FROM tags', (error, results) => {
    if(error) throw error
    response.status(200).json(results.rows)
  });
};
    
const getById = (request, response) => {
  console.log('get by id');

  const name = parseInt(request.params.name);
  db_propertis.pool.query(
    'SELECT id, author, name, bg_color, text_color FROM tags WHERE id_type IN (SELECT id FROM type_tags WHERE type_name = $1)',
    [name], (error, result) => {
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