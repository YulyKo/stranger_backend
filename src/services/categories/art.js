const { knex } = require('../../db');

const getAll = async ()  => {
  return await knex('arts');
};

module.exports = {
  getAll,
};
