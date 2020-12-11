const { knex } = require('../db');

const remove = async (tableName, columnName, id) => {
  await knex(tableName)
    .whereIn({ columnName: id })
    .del();
};

export default {
  remove
};
