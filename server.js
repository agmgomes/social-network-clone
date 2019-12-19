const express = require('express');
const routes = require('./routes');
const { validationErrorHandler } = require('./middlewares');

const logger = require('./utils/logger');

// Database
const database = require('./database');

// Testing the connection to Database by trying to authenticate
database
  .authenticate()
  .then(() => {
    logger.info('Connected to database');
  })
  .catch(err => {
    logger.error(`Unable to connect to the database: ${err}`);
  });

const app = express();

// Bodyparser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes Middleware
app.use('/', routes);

/**
 * error middlewares
 * validation error
 * global error
 */

app.use(validationErrorHandler);

const port = process.env.PORT || 5000;

app.listen(port, err => {
  if (err) {
    return logger.info(`App listening error ${err}`);
  }
  logger.info(`Server listening on port ${port}`);
});
