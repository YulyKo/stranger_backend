const logger = require('../../../utils/logger')(__filename);
const createError = require('http-errors');
const { categories: { relationship } } = require('../../../services');

const get = async (req, res, next) => {
  try {
    const realtionships = await relationship.getAll();
    res.status(200).send(realtionships);
    // made request
  } catch (error) {
    logger.error(error.message);
    next(createError(500, error.message));
  }
};
module.exports = {
  get,
};
