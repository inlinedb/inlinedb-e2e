const InlineDB = require('inlinedb');
const {expect} = require('code');

const {idbName, tableName, tableFilename} = require('../util/config');
const {readFile} = require('../util/file');

let idb,
  table;

module.exports = () =>
  when('reverting queries')

    .then(given(() => {

      idb = new InlineDB(idbName);
      table = idb.createTable(tableName);

      table.insert(
        {column: 'column insert 1'},
        {column: 'column insert 2'}
      );
      table.update(
        () => ({column: 'column update'}),
        row => /insert 1$/.test(row)
      );
      table.delete(row => /insert 2$/.test(row));

    }))

    .then(it('should not have updated the rows yet', async () => {

      const expectedData = {
        index: {},
        lastInsertId: 7,
        rows: []
      };

      const {err, data} = await readFile(tableFilename);

      expect(err).to.not.exist();
      expect(JSON.parse(data.toString())).to.equal(expectedData);

    }))

    .then(it('should not save any of the queries on revert', async () => {

      const expectedData = {
        index: {},
        lastInsertId: 7,
        rows: []
      };

      table.revert();

      await table.save();

      const {err, data} = await readFile(tableFilename);

      expect(err).to.not.exist();
      expect(JSON.parse(data.toString())).to.equal(expectedData);

    }))

;
