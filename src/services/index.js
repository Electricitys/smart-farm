const users = require('./users/users.service.js');
const datalake = require('./datalake/datalake.service.js');
const logger = require('./logger/logger.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(datalake);
  app.configure(logger);
};
