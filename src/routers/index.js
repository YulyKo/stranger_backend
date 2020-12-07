const router = require('express').Router();
const categoriesController = require('./categories');
const { team } = require('../controller');
const auth = require('./auth');

router.use('/category', categoriesController);
router.use('/team', team.get);
router.use('/auth', auth);

module.exports = router;
