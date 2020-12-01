const { knex } = require('../../db');

const getAllForPlots = async () => {
  const prefences = await knex('user_likes_plot')
    .select('*');
    return prefences;
};

module.exports = {
  getAllForPlots,
};
