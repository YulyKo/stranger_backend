const POOL = require('pg').Pool;
const pool = new POOL({
  user: 'postgres',
  host: 'localhost',
  database: 'stranger',
  password: 'admin',
  port: 5432,
});

module.exports = {
    pool,
};
