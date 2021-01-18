// Initializes the `datalake` service on path `/datalake`
const { Datalake } = require('./datalake.class');
const createModel = require('../../models/datalake.model');
const hooks = require('./datalake.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/datalake', new Datalake(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('datalake');

  service.hooks(hooks);
};
