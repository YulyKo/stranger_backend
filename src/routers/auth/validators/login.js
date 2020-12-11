const ajv = require('ajv')();

const schema = ajv.compile({
  type: 'object',
  required: ['login', 'password'],
  properties: {
    login: { type: 'string', format: 'login' },
    password: { type: 'string', minLength: 6 }
  }
});

module.exports = schema;
