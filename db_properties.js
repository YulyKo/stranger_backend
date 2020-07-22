const POOL = require('pg').Pool;
const pool = new POOL({
  user: 'postgres',
  host: 'localhost',
  database: 'stranger',
  password: 'admin',
  port: 5432,
  // connectionString: 'process.env.postgresql-colorful-86905',
  // ssl: {
  //   rejectUnauthorized: false
  // }
});

module.exports = {
    pool,
};
