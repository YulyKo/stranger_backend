const router = require('express').Router();
const { categories } = require('../../controller');

// plots
router.get('/plot', categories.plot.allPlots.getAllPlots);
router.post('/plot', categories.plot.create);
router.delete('/plot/:id', categories.plot.remove);
router.get('/plot/:id', categories.plot.plotById.get);

// locations
router.get('/location', categories.location.getAll);
router.post('/location', categories.location.create);
router.delete('/location/:id', categories.location.remove);
router.get('/location/:id', categories.location.get);

// persons
router.get('/person', categories.person.getAll);
router.post('/person', categories.person.create);
router.get('/person/:id', categories.person.get);
router.delete('/person/:id', categories.person.remove);

// arts
router.get('/art', categories.art.getAll.get);
router.post('/art', categories.art.create);
router.get('/art/:id', categories.art.getByID.get);

// realtionships
router.get('/relationship', categories.relationship.get);
router.post('/relationship', categories.relationship.create);

// tag
router.post('/tag', categories.tag.create);

module.exports = router;
