const logger = require('../../utils/logger')(__filename);
const createError = require('http-errors');
const {
  categories: { plot }
} = require('../../services');

const getAll = async (req, res, next) => {
  try {
    logger.info('get all lecturer plots');
    const allPlots = await plot.getAll();
    console.log(allPlots);
    logger.info(`found ${allPlots.length}`);
    res.send(allPlots);
  } catch (error) {
    logger.error(error.message);
    next(createError(500, error.message));
  }
};

module.exports = { getAll };
