const { knex } = require('../../db');

const getAllForPlots = async () => {
  return await knex('user_likes_plot');
};
const getAllForLocations = async () => {
  return await knex('user_likes_location');
};
const getAllForPersons = async () => {
  return knex('user_likes_person');
};

module.exports = {
  getAllForPlots,
  getAllForLocations,
  getAllForPersons,
};
