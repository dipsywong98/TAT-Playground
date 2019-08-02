import log4js from 'log4js';
log4js.configure({
  appenders: {
    dateFile: {
      type: 'dateFile',
      filename: './logs/log.log',
    },
    stdout: { type: 'stdout' },
  },
  categories: {
    default: { appenders: ['dateFile', 'stdout'], level: 'debug' },
  },
});

export = log4js.getLogger;
