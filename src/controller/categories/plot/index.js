const logger = require('../../../../utils/logger')(__filename);
const createError = require('http-errors');
const { plot } = require('../../../services/categories');
const { default: commonRemovingSmthById } = require('../../../utils/commonRemovingSmthById');

const allPlots = require('./allPlots');
const plotById = require('./plotById');

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

const remove = async (req, res, next) => {
  try {
    logger.info('delete plot');
    await commonRemovingSmthById.remove('plot_tag', 'id_plot', req.params.id);
    await commonRemovingSmthById.remove('plot_location', 'id_plot', req.params.id);
    await commonRemovingSmthById.remove('plot_person', 'id_plot', req.params.id);
    await commonRemovingSmthById.remove('plots', 'id', req.params.id);
  } catch (error) {
    logger.error(error.message);
    next(createError(500, error.message));
  }
};

module.exports = {
  allPlots,
  plotById,
  create,
  remove,
};
