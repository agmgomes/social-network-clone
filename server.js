const express = require('express');

const logger = require('./utils/logger');

// Database
const database = require('./database');

const app = express();

// Bodyparser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Testing the connection to Database by trying to authenticate
database
  .authenticate()
  .then(() => {
    logger.info('Connected to database');
  })
  .catch(err => {
    logger.error(`Unable to connect to the database: ${err}`);
  });

const port = process.env.PORT || 5000;

app.listen(port, err => {
  if (err) {
    return logger.info(`App listening error ${err}`);
  }
  logger.info(`Server listening on port ${port}`);
});
