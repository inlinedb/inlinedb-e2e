const InlineDB = require('inlinedb');
const assert = require('assert');

const dbName = 'test';
const idb = new InlineDB(dbName);

run('it should read the configuration', () => {

  const expectedConfig = {
    dbName,
    tables: []
  };

  assert.deepEqual(idb.idbConfig, expectedConfig);

});

