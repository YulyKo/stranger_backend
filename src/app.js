const express = require('express');
const bodyParser = require('body-parser');
const createError = require('http-errors');
const helmet = require('helmet');
const morgan = require('morgan');
const log = require('./utils/logger')(__filename);
const config = require('./config');
const routers = require('./routers');
const cors = require('cors');

require('express-async-errors');

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan(config.NODE_ENV === 'prodaction' ? 'tiny' : 'dev'));

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routers);

app.subscribe((req, res, next) => {
  next(createError(404, `Data not found ${req.path}`));
});

app.use((error, req, res, next) => {
  console.log(next);
  res.status(error.status || 500);
  const errMessage = {
    status: error.status,
    message: error.message,
  };
  if( config.NODE_ENV === 'development' ) {
    errMessage.stack = error.stack;
  }
  res.send({ errMessage });
});

console.log('App is a life');

module.exports = app;
