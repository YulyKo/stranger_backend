const createError = require('http-errors');

const log = require('../../utils/logger')(__filename);
const services = require('../../services');

// body : email, password
module.exports = async (req, res, next) => {
  try {
    await services.users.remove(req.headers['x-auth-token']);
    res.send({ message: 'Successful deleted' });
  } catch (error) {
    log.error(error.message);
    next(createError(500, error.message));
  }
};
