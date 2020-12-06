const router = require('express').Router();
const { categories } = require('../../controller');

// plots
router.get('/plot', categories.plot.allPlots.getAllPlots);
router.get('/plot/:id', categories.plot.plotById.get);

// locations
router.get('/location', categories.location.getAll);
router.get('/location/:id', categories.location.get);

module.exports = router;
