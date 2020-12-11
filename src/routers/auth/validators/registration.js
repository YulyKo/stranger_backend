const ajv = require('ajv')();

const schema = ajv.compile({
  type: 'object',
  required: ['login', 'name', 'dateOfBirdth', 'password'],
  properties: {
    login: { type: 'string', format: 'login' },
    name: { type: 'string' },
    dateOfBirdth: { type: 'date' },
    password: { type: 'string', minLength: 6 }
  }
});

module.exports = schema;
