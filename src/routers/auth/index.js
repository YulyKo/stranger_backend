const router = require('express').Router();
const controller = require('../../controller');

const schema = require('./validators');
const { validator, auth } = require('../../utils');

router.post(
  '/registration',
  validator(schema.registration),
  controller.auth.registration
);

router.post('/login', validator(schema.login), controller.auth.login);

router.delete('/user', auth, controller.auth.remove);

module.exports = router;
