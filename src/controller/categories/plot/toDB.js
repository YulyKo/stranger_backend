const logger = require('../../../../utils/logger')(__filename);
const createError = require('http-errors');
const { plot } = require('../../../services/categories');

const create = async (req, res, next) => {
  try {
    logger.info('add new plot');
    const plotID = await plot.create(req.body);
    res.send({
      message: 'successfull created',
      plotID
    });
  } catch (error) {
    logger.error(error.message);
    next(createError(500, error.message));
  }
};
module.exports = {
  create,
};
