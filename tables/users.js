const db_propertis = require('../db_properties');

const getWithHash = (request, response) => {
  db_propertis.pool.query(
    'SELECT login, password_hash, name FROM users UNION SELECT login, password_hash, name FROM admins;',
    (error, results) => { if (error) { console.log(error.message) }
    response.status(200).json(results.rows)
  });
};

const create = (request, response) => {
  const { login, name, date_of_birth, password } = request.body
  db_propertis.pool.query(
    'INSERT INTO users (login, name, date_of_birth, password_hash) VALUES ($1, $2, $3, $4)',
    [ login, name, date_of_birth, password ], (error, results) => {
      if (error) { console.log(error.message) }
    response.status(201).send(`User added with ID: ${results.insertId}`)
  })
}

module.exports = {
  getWithHash,
  create,
}
