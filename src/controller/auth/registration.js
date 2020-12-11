const createError = require('http-errors');

const log = require('../../utils/logger')(__filename);
const services = require('../../services');

// body : login, password, name, dateOfBirdth
module.exports = async (req, res, next) => {
  log.info('registration new user');
  try {
    // check if user exist
    const user = await services.user.findByLogin(req.body.login);
    if (user) {
      res.status(409).send({ message: 'login already exist' });
      return false;
    }
  } catch (error) {
    log.error(error.message);
    next(createError(500, error.message));
  }
  return true;
};
