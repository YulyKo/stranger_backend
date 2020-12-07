const router = require('express').Router();
const { categories } = require('../../controller');

// plots
router.get('/plot', categories.plot.allPlots.getAllPlots);
router.get('/plot/:id', categories.plot.plotById.get);

// locations
router.get('/location', categories.location.getAll);
router.get('/location/:id', categories.location.get);

// persons
router.get('/person', categories.person.getAll);
router.get('/person/:id', categories.person.get);

// arts
router.get('/art', categories.art.getAll.get);
router.get('/art/:id', categories.art.getByID.get);

// realtionships
router.get('/relationship', categories.relationship.getAll.get);

module.exports = router;
