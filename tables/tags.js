const db_propertis = require('../db_properties');
const _by_id = require('../common/_by_id')

const post = (request, response) => {
  const { id_type, author, name, bg_color, text_color } = request.body;
  db_propertis.pool.query(
    'INSERT INTO tags( id_type, author, name, bg_color, text_color ) VALUES ($1, $2, $3, $4, $5)',
    [id_type, author, name, bg_color, text_color], (error, results) => {
      if (error) { console.log(error.message) }
      response.status(201).send(`Plot add with ID: ${results.insertId}`)
    }
  );
};

const deleteById = (request, response) => {
  const { id, id_type } = request.params;
  if (+id_type === 1) {
    _by_id.deleteInfoOfSmthById('plot_tag', 'id_tag', id );
    _by_id.deleteInfoOfSmthById('tags', 'id', id );
  }
  if (+id_type === 2) {
    _by_id.deleteInfoOfSmthById('art_tag', 'id_tag', id );
    _by_id.deleteInfoOfSmthById('tags', 'id', id );
  }
};

const getByTypeName = (request, response) => {
  const { type } = request.params;
  db_propertis.pool.query(
    "SELECT id, name, bg_color, text_color FROM tags WHERE id_type IN (SELECT id from type_tags where type_name = $1);", [type], 
    (error, results) => {
    if(error) { console.log(error.message) }
    response.status(200).json(results.rows)
  });
}
  
module.exports = {
  post,
  deleteById,
  getByTypeName,
};