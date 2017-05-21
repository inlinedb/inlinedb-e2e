given('when creating a new database');

const InlineDB = require('inlinedb');
const assert = require('assert');
const fs = require('fs');

const idbName = 'test';
const filename = `./${idbName}/.idb`;

new InlineDB(idbName);

run('it should create idb config file', () => {

  fs.statSync(filename);

});

run('it should write default configuration', () => {

  fs.readFile(filename, (err, config) => {

    assert(!err, err);

    const expectedConfig = {
      idbName,
      tables: []
    };

    assert.deepEqual(JSON.parse(config.toString()), expectedConfig);

  });

});
