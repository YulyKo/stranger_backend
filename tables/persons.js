const db_properties = require('../db_properties');
const _by_id = require("../common/_by_id");

const post = (request, response) => {
  const { author, name, age, sex , shot_description,  story_of_life } = request.body;
  db_properties.pool.query(
    'INSERT INTO persons( author, name, age, sex, shot_description,  story_of_life ) VALUES ($1, $2, $3, $4, $5, $6)',
    [author, name, age, sex , shot_description,  story_of_life], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`person add with ID: ${results.insertId}`)
    }
  );
};

const del = (request) => {
  const id = parseInt(request.params.id)
  _by_id.deleteInfoOfSmthById('plot_person', 'id_person', id)
  _by_id.deleteInfoOfSmthById('relationships', 'id_person', id)
  _by_id.deleteInfoOfSmthById('relationships', 'id_person2', id)
  _by_id.deleteInfoOfSmthById('persons', 'id', id)
};

const get = (request, response) => {
  db_properties.pool.query('SELECT id, name, sex, age, shot_description FROM persons', (error, results) => {
    if(error) throw error
    response.status(200).json(results.rows)
  });
};
  
const getById = (request, response) => {
  const id = parseInt(request.params.id);
  db_properties.pool.query('SELECT * FROM persons WHERE id = $1 LIMIT 1', [id], (error, result) => {
    if (error) { throw error }
    response.status(200).json(result.rows);
  });
};

module.exports = {
  get,
  getById,
  post,
  del,
};
