"use strict";

var router = require('express').Router();

var _require = require('../../controller'),
    categories = _require.categories;

router.get('/plot', categories.plots.allPlots.getAllPlots);
module.exports = router;