const db_properties = require("../db_properties")

const get = (request, response) => {
  db_properties.pool.query('SELECT * FROM team', (error, results) => {
    if (error) { console.log(error.message) }
    response.status(200).json(results.rows)
  });
};

module.exports = {
  get,
};
