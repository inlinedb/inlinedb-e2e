const InlineDB = require('inlinedb');
const {expect} = require('code');

const {fileExists, readFile} = require('../util/file');
const {idbName, tableName, tableFilename} = require('../util/config');

let idb,
  table;

module.exports = () =>
  when('saving the table')

    .then(given(() => {

      idb = new InlineDB(idbName);
      table = idb.createTable(tableName);

    }))

    .then(it('should not have created the table yet', () => {

      expect(() => fileExists(tableFilename)).to.throw();

    }))

    .then(it('should create the table on save', async () => {

      const expectedData = {
        index: {},
        lastInsertId: 0,
        rows: []
      };

      await table.save();

      const {err, data} = await readFile(tableFilename);

      expect(err).to.not.exist();
      expect(JSON.parse(data.toString())).to.equal(expectedData);

    }))

;
