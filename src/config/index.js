require('dotenv').config();

const joi = require('joi');

const schema = joi
  .object()
  .options({ abortEarly: false })
  .keys({
    NODE_ENV: joi.string().default('development'),
    HOST: joi.string(),
    PORT: joi.number().required(),
    SECRET: joi.string().required(),
    DBHOST: joi.string().required(),
    DBPORT: joi.string().required(),
    DBNAME: joi.string().required(),
    DBUSER: joi.string().required(),
    DBPASSWORD: joi.string()
  })
  .unknown()
  .required();
const { error, value: envVars } = schema.validate(process.env);

if (error) {
  throw error.message;
}

const config = Object.freeze(JSON.parse(JSON.stringify(envVars)));

module.exports = config;
