const router = require('express').Router();
const categoriesController = require('./categories');
const { team } = require('../controller');

router.use('/category', categoriesController);
router.use('/team', team.get);

module.exports = router;
