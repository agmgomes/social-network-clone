const express = require('express');
const bearerToken = require('express-bearer-token');
const routes = require('./routes');
const {
  validationErrorHandler,
  globalErrorHandler,
  httpLogger
} = require('./middlewares');

const { logger } = require('./utils');

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

// HTTP Logger Middleware
app.use(httpLogger);

// Bearer Token Middleware
app.use(bearerToken());

// Routes Middleware
app.use('/', routes);

/**
 * Error Middlewares
 *  Validation Error Handler
 *  Global Error Handler
 */
app.use(validationErrorHandler);
app.use(globalErrorHandler);

const port = process.env.PORT || 5000;

app.listen(port, err => {
  if (err) {
    return logger.info(`App listening error ${err}`);
  }
  logger.info(`Server listening on port ${port}`);
});
