const http = require('http');
const config = require('./config');
const log = require('./utils/logger')(__filename);
const app = require('./app');
const { knex } = require('./db');

const server = http.createServer(app);

knex
  .raw('select 1+1 as result')
  .then(() => {
    server.listen(config.PORT, () => {
      log.info(`Server running at ${config.HOST} port ${config.PORT}`);
    });
  })
  .catch(err => {
    log.error('system error', err);
    process.exit(1);
  });
