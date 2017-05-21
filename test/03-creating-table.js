const InlineDB = require('inlinedb');
const {expect} = require('code');
const fs = require('fs');
const {clean, idbName: name} = require('../util/config');

describe('03 - Creating a new table in database', () => {

  const idbName = `${name}-table`;
  const idbFilename = `./${idbName}/.idb`;
  const tableName = 'table-name';

  clean(idbName);

  const idb = new InlineDB(idbName);

  idb.createTable(tableName);

  it('should add the table name to idb', done => {

    const expectedConfig = {
      idbName,
      tables: {
        [tableName]: {
          lastInsertId: 0
        }
      }
    };

    fs.readFile(idbFilename, (err, config) => {

      expect(err).to.not.exist();

      expect(JSON.parse(config.toString())).to.equal(expectedConfig);

      done();

    });

  });

});
