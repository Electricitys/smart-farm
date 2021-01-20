const assert = require('assert');
const app = require('../../src/app');

describe('\'logger\' service', () => {
  it('registered the service', () => {
    const service = app.service('logger');

    assert.ok(service, 'Registered the service');
  });
});
