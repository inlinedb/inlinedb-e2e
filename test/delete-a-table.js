const InlineDB = require('inlinedb');
const {expect} = require('code');

const {idbName, idbFilename, tableName, tableFilename} = require('../util/config');
const {fileExists, readFile} = require('../util/file');

let idb;

module.exports = () =>
  when('deleting a table')

    .then(given(() => idb = new InlineDB(idbName)))

    .then(it('should have the table file', () => {

      expect(() => fileExists(tableFilename)).to.not.throw();

    }))

    .then(it('should have the table name in idb', async () => {

      const expectedConfig = {
        idbName,
        tables: {
          [tableName]: {}
        }
      };

      const {err, data} = await readFile(idbFilename);

      expect(err).to.not.exist();
      expect(JSON.parse(data.toString())).to.equal(expectedConfig);

    }))

    .then(it('should delete the table from system', async () => {

      idb.dropTable(tableName);

      expect(() => fileExists(tableFilename)).to.throw();

    }))

    .then(it('should delete the table name from idb', async () => {

      const expectedConfig = {
        idbName,
        tables: {}
      };

      const {err, data} = await readFile(idbFilename);

      expect(idb.idbConfig).to.equal(expectedConfig);

      expect(err).to.not.exist();
      expect(JSON.parse(data.toString())).to.equal(expectedConfig);

    }))

;
