const Knex = require('knex');

const config = require('../config');

const dbOptions = require('../../knexfile')[config.NODE_ENV];

const knex = new Knex(dbOptions);

module.exports = knex;
