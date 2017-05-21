const InlineDB = require('inlinedb');
const assert = require('assert');
const fs = require('fs');

const dbName = 'test';
const filename = `./${dbName}/.idb`;

new InlineDB(dbName);

run('it should create idb config file', () => {

  fs.statSync(filename);

});

run('it should write default configuration', () => {

  fs.readFile(filename, (err, config) => {

    assert(!err, err);

    const expectedConfig = {
      dbName,
      tables: []
    };

    assert.deepEqual(JSON.parse(config.toString()), expectedConfig);

  });

});

