const router = require('express').Router();
const { categories } = require('../../controller');

router.get('/plot', categories.plots.allPlots.getAllPlots);
router.get('/plot/:id', categories.plots.plotById.get);

module.exports = router;
