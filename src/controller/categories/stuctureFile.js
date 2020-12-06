const logger = require('../../../utils/logger')(__filename);
const createError = require('http-errors');


const methodForUseCategory = async (req, res, next) => {
  try {
    // made request
  } catch (error) {
    logger.error(error.message);
    next(createError(500, error.message));
  }
};
module.exports = {
  methodForUseCategory,
};
