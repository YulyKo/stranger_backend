const db_propertis = require('../db_properties');
const name = 'users';

const get = (request, response) => {
  console.log('get users');

  db_propertis.pool.query('SELECT * FROM users', (error, results) => {
      if(error) { throw error }
      response.status(200).json(results.rows)
  });
};
  
const getById = (request, response) => {
  console.log('get by login');
  
  const login = parseInt(request.params.login);
  db_propertis.pool.query('SELECT * FROM users WHERE login = $1', [login], (error, result) => {
      if (error) { throw error }
      response.status(200).json(result.rows);
  });
};
  
  
const create = (request, response) => {
  const { login, name, date_of_birth, password } = request.body
  console.log('create user');

  db_propertis.pool.query(
    'INSERT INTO users (login, name, date_of_birth, password_hash) VALUES ($1, $2, $3, $4)',
    [ login, name, date_of_birth, password ], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${results.insertId}`)
  })
}
    
const update = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email } = request.body

  db_propertis.pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const del = (request, response) => {
  const id = parseInt(request.params.id)

  db_propertis.pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  name,
  get,
  getById,
  create,
  update,
  del,
}
  