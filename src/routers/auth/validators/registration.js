const ajv = require('ajv')();

const schema = ajv.compile({
  type: 'object',
  required: ['login', 'firstName', 'lastName', 'password'],
  properties: {
    email: { type: 'string', format: 'login' },
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    password: { type: 'string', minLength: 6 }
  }
});

module.exports = schema;
