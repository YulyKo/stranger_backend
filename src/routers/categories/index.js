const router = require('express').Router();
const { categories } = require('../../controller');

router.get('/plot', categories.plots.allPlots.getAllPlots);

module.exports = router;
