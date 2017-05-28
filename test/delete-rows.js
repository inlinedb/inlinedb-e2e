const InlineDB = require('inlinedb');
const {expect} = require('code');

const {idbName, tableName, tableFilename} = require('../util/config');
const {generateRow, generateRows} = require('../util/rows.js');
const {readFile} = require('../util/file');

const ids = {
  five: 5,
  four: 4,
  seven: 7,
  six: 6,
  three: 3
};
let idb,
  table;

module.exports = () =>
  when('deleting rows in the table')

    .then(given(() => {

      idb = new InlineDB(idbName);
      table = idb.createTable(tableName);

      table.update(
        () => Object.assign({column: 'column awesome'}),
        row => row.$idbID <= 2
      );
      table.insert(
        {
          column: 'column insert 1'
        },
        {
          column: 'column insert 2'
        }
      );

    }))

    .then(it('should not have delete the rows yet', async () => {

      const expectedData = {
        index: {
          1: 0,
          2: 1,
          3: 2,
          4: 3
        },
        lastInsertId: 4,
        rows: generateRows(
          'column match',
          'column',
          'column random',
          'column random'
        )
      };

      const {err, data} = await readFile(tableFilename);

      expect(err).to.not.exist();
      expect(JSON.parse(data.toString())).to.equal(expectedData);

    }))

    .then(it('should delete the rows satisfied by a filter function', async () => {

      const expectedRows = [
        generateRow(ids.three, 'column random'),
        generateRow(ids.four, 'column random'),
        generateRow(ids.five, 'column insert 1'),
        generateRow(ids.six, 'column insert 2')
      ];

      table.delete(row => /awesome$/.test(row.column));

      await table.save();

      const result = await table.query();

      expect(result).to.equal(expectedRows);

    }))

    .then(it('should update the row with matching id', async () => {

      const id = 5;
      const expectedRows = [
        generateRow(ids.three, 'column random'),
        generateRow(ids.four, 'column random'),
        generateRow(ids.six, 'column insert 2')
      ];

      table.delete(id);

      await table.save();

      const result = await table.query();

      expect(result).to.equal(expectedRows);

    }))

    .then(it('should delete the rows with matching ids', async () => {

      const id1 = 6;
      const id2 = 3;
      const expectedRows = [
        generateRow(ids.four, 'column random'),
        generateRow(ids.seven, 'column awesome')
      ];

      table.insert({
        column: 'column awesome'
      });
      table.delete([id1, id2]);

      await table.save();

      const result = await table.query();

      expect(result).to.equal(expectedRows);

    }))

    .then(it('should delete all the rows when there is no filter', async () => {

      const expectedRows = [];

      table.delete();

      await table.save();

      const result = await table.query();

      expect(result).to.equal(expectedRows);

    }))

    .then(it('should have written all the changes into the table', async () => {

      const expectedData = {
        index: {},
        lastInsertId: 7,
        rows: []
      };

      const {err, data} = await readFile(tableFilename);

      expect(err).to.not.exist();
      expect(JSON.parse(data.toString())).to.equal(expectedData);

    }))

;
