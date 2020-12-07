const { knex } = require('../../db');

const getAll = async () => {
  return await knex('team');
};

module.exports = {
  getAll,
};
