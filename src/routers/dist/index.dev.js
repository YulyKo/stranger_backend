"use strict";

var router = require('express').Router();

var categoriesController = require('./categories');

router.use('/category', categoriesController); // router.use('/data', console.log(router));

module.exports = router;