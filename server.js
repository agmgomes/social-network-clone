const express = require('express');

const logger = require('./utils/logger');

const app = express();

// Bodyparser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 5000;

app.listen(port, err => {
  if (err) {
    return logger.info(`App listening error ${err}`);
  }
  logger.info(`Server listening on port ${port}`);
});
