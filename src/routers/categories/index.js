const router = require('express').Router();
const { categories } = require('../../controller');

router.get('/plot', categories.plots.getAll);

module.exports = router;
