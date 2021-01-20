// Initializes the `logger` service on path `/logger`
const { Logger } = require('./logger.class');
const createModel = require('../../models/logger.model');
const hooks = require('./logger.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/logger', new Logger(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('logger');

  service.hooks(hooks);
};
