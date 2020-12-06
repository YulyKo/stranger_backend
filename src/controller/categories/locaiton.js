const logger = require('../../utils/logger')(__filename);
const { categories: { location } } = require('../../services');
const createError = require('http-errors');
const preference = require('../../services/categories/preference');

const resultJSON = [];

function compareLocationsToJSON(locations) {
  for (let index = 0; index < locations.length; index++) {
    const location = locations[index];
    resultJSON[index] = location;
  }
}

async function getLocations(res) {
  const locations = await location.get();
  compareLocationsToJSON(locations);
  getUsersLikes(res);
}

function comparePreferences(users) {
  for (let index = 0; index < resultJSON.length; index++) {
    const location = resultJSON[index];
    location.users = users;
  }
}

async function getUsersLikes(res) {
  const preferences = await preference.getAllForLocations();
  comparePreferences(preferences);
  res.status(200).send(resultJSON);
}

const get = async (req, res, next) => {
  try {
    logger.info('get all locations');
    getLocations(res);
  } catch (error) {
    logger.error(error);
    next(createError(500, error.message));
  }
};

module.exports = {
  get,
};
