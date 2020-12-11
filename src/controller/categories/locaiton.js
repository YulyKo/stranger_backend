const logger = require('../../utils/logger')(__filename);
const { categories: { location } } = require('../../services');
const createError = require('http-errors');
const preference = require('../../services/categories/preference');
const { response } = require('express');
const { default: commonRemovingSmthById } = require('../../utils/commonRemovingSmthById');

let resultJSON = [];

function compareLocationsToJSON(locations) {
  for (let index = 0; index < locations.length; index++) {
    const location = locations[index];
    resultJSON[index] = location;
  }
}

async function getLocations(res) {
  const locations = await location.get();
  if(locations !== []) compareLocationsToJSON(locations);
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
  if(preferences !== []) comparePreferences(preferences);
  res.status(200).send(resultJSON);
}

const getAll = async (req, res, next) => {
  try {
    logger.info('get all locations');
    getLocations(res);
    response.on('finish', () => {
      resultJSON = [];
    });
  } catch (error) {
    logger.error(error);
    next(createError(500, error.message));
  }
};

const get = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    logger.info(`get location by ${id}`);
    const locationByID = await location.getByID(id);
    res.status(200).send(locationByID);
  } catch (error) {
    logger.error(error.message);
    next(createError(500, error.message));
  }
};

const create = async (req, res, next) => {
  try {
    logger.info('create new location');
    const id = await location.create(req.body);
    res.send({
      message: 'successful created',
      id
    });
  } catch (error) {
    logger.error(error.message);
    next(createError(500, error.message));
  }
};

const remove = async (req, res, next) => {
  try {
    logger.info('delete location');
    await commonRemovingSmthById.remove('plot_location', 'id_location', req.params.id);
    await commonRemovingSmthById.remove('locations', 'id', req.params.id);
  } catch (error) {
    logger.error(error.message);
    next(createError(500, error.message));
  }
};

module.exports = {
  getAll,
  get,
  create,
  remove,
};
