const logger = require('../utils/logger')(__filename);
const createError = require('http-errors');
const { team } = require('../services');

const get = async (req, res, next) => {
  try {
    const teamList = await team.getAll();
    res.status(200).send(teamList);
  } catch (error) {
    logger.error(error.message);
    next(createError(500, error.message));
  }
};
module.exports = {
  get,
};
