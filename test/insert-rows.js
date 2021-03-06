const InlineDB = require('inlinedb');
const {expect} = require('code');

const {idbName, tableName, tableFilename} = require('../util/config');
const {generateRows} = require('../util/rows.js');
const {readFile} = require('../util/file');

let idb,
  table;

module.exports = () =>
  when('inserting rows into a table')

    .then(given(() => {

      idb = new InlineDB(idbName);
      table = idb
        .createTable(tableName)
        .insert(
          {column: 'column awesome'},
          {column: 'column match'},
          {column: 'column random'}
        );

    }))

    .then(it('should not have inserted the rows into table yet', async () => {

      const expectedData = {
        index: {},
        lastInsertId: 0,
        rows: []
      };

      const {err, data} = await readFile(tableFilename);

      expect(err).to.not.exist();
      expect(JSON.parse(data.toString())).to.equal(expectedData);

    }))

    .then(it('should insert the rows on save', async () => {

      const expectedData = {
        index: {
          1: 0,
          2: 1,
          3: 2
        },
        lastInsertId: 3,
        rows: generateRows(
          'column awesome',
          'column match',
          'column random'
        )
      };

      await table.save();

      const {err, data} = await readFile(tableFilename);

      expect(err).to.not.exist();
      expect(JSON.parse(data.toString())).to.equal(expectedData);

    }))

;
