"use strict";

require('dotenv').config();

var joi = require('joi');

var schema = joi.object().options({
  abortEarly: false
}).keys({
  NODE_ENV: joi.string()["default"]('development'),
  HOST: joi.string(),
  PORT: joi.number().required(),
  SECRET: joi.string().required(),
  DBHOST: joi.string().required(),
  DBPORT: joi.string().required(),
  DBNAME: joi.string().required(),
  DBUSER: joi.string().required(),
  DBPASSWORD: joi.string()
}).unknown().required();

var _schema$validate = schema.validate(process.env),
    error = _schema$validate.error,
    envVars = _schema$validate.value;

if (error) {
  throw error.message;
}

var config = Object.freeze(JSON.parse(JSON.stringify(envVars)));
module.exports = config;