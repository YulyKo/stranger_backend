const { knex } = require('../db');

const remove = async (tableName, id) => {
  await knex(tableName)
    .where({ id })
    .del();
};

export default {
  remove
};
