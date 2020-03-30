const db_propertis = require('./../db_propertis');

const name = 'persons';

const post = (request, response) => {
  const { author, name, age, sex , shot_description,  story_of_life } = request.body;
  db_propertis.pool.query(
    'INSERT INTO persons( author, name, age, sex , shot_description,  story_of_life ) VALUES ($1, $2, $3, $4, $5, $6)',
    [author, name, age, sex , shot_description,  story_of_life], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`person add with ID: ${results.insertId}`)
    }
  );
  console.log('add person tag');
};

const del = (request, response) => {
  const id = parseInt(request.params.id)

  db_propertis.pool.query('DELETE FROM persons WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`person deleted with ID: ${id}`)
  });
};


const update = (request, response) => {
  const id = parseInt(request.params.id)
  const { author, name, age, sex, shot_description, story_of_life } = request.body
//  author | name | age | sex  | shot_description |  story_of_life
  db_propertis.pool.query(
    'UPDATE persons SET author = $1, name = $2, age = $3, sex = $4, shot_description = $5, story_of_life = $6 WHERE id = $7',
    [author, name, age, sex , shot_description,  story_of_life],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`person modified with ID: ${id}`)
    }
  );
};

const get = (request, response) => {
  console.log('get persons');

  db_propertis.pool.query('SELECT * FROM persons', (error, results) => {
    if(error) throw error
    response.status(200).json(results.rows)
  });
};
  
const getById = (request, response) => {
  console.log('person get by id');
  
  const id = parseInt(request.params.id);
  db_propertis.pool.query('SELECT * FROM persons WHERE id = $1 limit 1', [id], (error, result) => {
    if (error) { throw error };
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
