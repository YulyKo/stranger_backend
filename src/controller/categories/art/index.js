const logger = require('../../../../utils/logger')(__filename);
const createError = require('http-errors');
const { art } = require('../../../services/categories');
const { default: commonRemovingSmthById } = require('../../../utils/commonRemovingSmthById');

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

const remove = async (req, res, next) => {
  try {
    logger.info('delete art');
    const id = req.params.id;
    await commonRemovingSmthById.remove('art_tag', 'id_art', id);
    await commonRemovingSmthById.remove('arts', 'id', id);
  } catch (error) {
    logger.error(error.message);
    next(createError(500, error.message));
  }
};

module.exports = {
  getAll,
  getByID,
  create,
  remove,
};
