const { knex } = require('../../db');

const getAllForPlots = async () => {
  return await knex('user_likes_plot');
};
const getAllForLocations = async () => {
  return await knex('user_likes_location');
};

module.exports = {
  getAllForPlots,
  getAllForLocations,
};
