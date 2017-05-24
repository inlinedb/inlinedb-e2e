const InlineDB = require('inlinedb');
const {expect} = require('code');
const fs = require('fs');
const {clean} = require('../util/helper');

describe('03 - Creating a new table in database', () => {

  const idbName = 'idb-table';
  const tableName = 'table-name';
  const idbFilename = `./${idbName}/.idb`;

  clean(idbName);

  const idb = new InlineDB(idbName);

  idb.createTable(tableName);

  it('should add the table name to idb', done => {

    const expectedConfig = {
      idbName,
      tables: {
        [tableName]: {}
      }
    };

    fs.readFile(idbFilename, (err, config) => {

      expect(err).to.not.exist();

      expect(JSON.parse(config.toString())).to.equal(expectedConfig);

      done();

    });

  });

});
