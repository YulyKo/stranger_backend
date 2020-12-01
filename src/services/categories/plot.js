const { knex } = require('../../db');

const getAll = async () => {
  const plots = await knex('plots')
    .select(
      'plots.id',
      'plots.title',
      'plots.description',
      'plots.text',
      'plots.author',
      'plots.likes',
    );
  return plots;
};

const getById = async (id) => {
  console.log('get by id');
  const [ plot ] = await knex('plots')
    .where({ id });
  return plot;
};

module.exports = {
  getAll,
  getById,
};
