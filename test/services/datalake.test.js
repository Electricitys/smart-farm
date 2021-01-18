const assert = require('assert');
const app = require('../../src/app');

describe('\'datalake\' service', () => {
  it('registered the service', () => {
    const service = app.service('datalake');

    assert.ok(service, 'Registered the service');
  });
});
