const logger = require('../../../../utils/logger')(__filename);
const createError = require('http-errors');
const { art } = require('../../../services/categories');

const getAll = require('./getAll');
const getByID = require('./getByID');

const create = async (req, res, next) => {
  try {
    logger.info('create art');
    await art.create(req.data);
  } catch (error) {
    logger.error(error.message);
    next(createError(500, error.message));
  }
};

module.exports = {
  getAll,
  getByID,
  create,
};
