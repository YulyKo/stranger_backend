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
const getAllForArts = async () => {
  return knex('user_likes_atr');
};
const getForPersonByID = async (id) => {
  return knex('user_likes_person').where({ 'person_id': id });
};

module.exports = {
  getAllForPlots,
  getAllForLocations,
  getAllForPersons,
  getAllForArts,
  getForPersonByID,
};
