const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`),
    format.colorize()
  ),
  transports: [
    new transports.File({
      filename: './logs/server.log',
      json: false,
      maxsize: 5242880, // 5MB
      maxFiles: 5
    }),
    new transports.Console()
  ]
});

module.exports = logger;
