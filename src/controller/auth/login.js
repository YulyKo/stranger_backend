const createError = require('http-errors');

const log = require('../../utils/logger')(__filename);
const services = require('../../services');

// body : email, password
module.exports = async (req, res, next) => {
  try {
    const user = await services.user.findByEmail(req.body.login);
    if (
      user &&
      services.user.validPassword(req.body.password, user.password_hash)
    ) {
      res.send({ message: 'Successful login', token: user.token });
    } else {
      res.status(400).send({ message: 'Bad request' });
    }
  } catch (error) {
    log.error(error.message);
    next(createError(500, error.message));
  }
  return true;
};
