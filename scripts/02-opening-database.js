given('when opening an existing database');

const InlineDB = require('inlinedb');
const assert = require('assert');

const idbName = 'test';
const idb = new InlineDB(idbName);

run('it should read the configuration', () => {

  const expectedConfig = {
    idbName,
    tables: []
  };

  assert.deepEqual(idb.idbConfig, expectedConfig);

});

