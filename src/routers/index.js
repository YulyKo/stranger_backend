const router = require('express').Router();
const categoriesController = require('./categories');

router.use('/category', categoriesController);
// router.use('/data', console.log(router));

module.exports = router;
