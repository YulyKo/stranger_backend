"use strict";

var Knex = require('knex');

var config = require('../config');

var dbOptions = require('../../knexfile')[config.NODE_ENV];

var knex = new Knex(dbOptions);
module.exports = knex;