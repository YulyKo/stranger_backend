const db_propertis = require('../../db_propertis');

const name = 'arts';

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



module.exports = {
  name,
  update,
};
