const logger = require('../../../utils/logger')(__filename);
const createError = require('http-errors');
const { tag } = require('../../services/categories');


const create = async (req, res, next) => {
  try {
    logger.info('create tag');
    tag.create(req.data);
  } catch (error) {
    logger.error(error.message);
    next(createError(500, error.message));
  }
};
module.exports = {
  create,
};
