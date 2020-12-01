/* eslint-disable no-unused-vars */
const logger = require('../../../utils/logger')(__filename);
const createError = require('http-errors');
const { categories: { plot, tag, location } } = require('../../../services');

const get = async (req, res, next) => {
  try {
    const id = req.params.id;
    logger.info(`get plot by id ${id}`);
    // const plotInfo = await plot.getById(id);
    // const tags = await tag.getForPlot(id);
    const locations = location.getForPlot(id);
    res.status(200).send(locations);
  } catch (error) {
    logger.error(error.message);
    next(createError(500, error.message));
  }
};

module.exports = {
  get,
};
