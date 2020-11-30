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

module.exports = {
  getAll,
};
