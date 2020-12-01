const logger = require('../../../utils/logger')(__filename);
const createError = require('http-errors');
const { categories: { plot } } = require('../../../services');

const get = async (req, res, next) => {
  try {
    const id = req.params.id;
    logger.info(`get plot by id ${id}`);
    const plotInfo = await plot.getById(id);
    res.status(200).send(plotInfo);
  } catch (error) {
    logger.error(error.message);
    next(createError(500, error.message));
  }
};

module.exports = {
  get,
};
