const InlineDB = require('inlinedb');
const {expect} = require('code');

const {idbName, tableName} = require('../util/config');
const {generateRow, generateRows} = require('../util/rows.js');

let idb,
  table;

module.exports = () =>
  when('querying rows from the table')

    .then(given(() => {

      idb = new InlineDB(idbName);
      table = idb.createTable(tableName);

    }))

    .then(it('should return all the rows when there is no filter', async () => {

      const expectedRows = generateRows(
        'column awesome',
        'column match',
        'column random'
      );

      const result = await table.query();

      expect(result).to.equal(expectedRows);

    }))

    .then(it('should return the rows satisfied by a filter function', async () => {

      const filterFunction = row => row.column === 'column match';
      const result = await table.query(filterFunction);
      const expectedRows = [generateRow(2, 'column match')];

      expect(result).to.equal(expectedRows);

    }))

    .then(it('should return the row with matching id', async () => {

      const id = 1;
      const result = await table.query(id);
      const expectedRows = [generateRow(1, 'column awesome')];

      expect(result).to.equal(expectedRows);

    }))

    .then(it('should return the rows with matching ids', async () => {

      const id1 = 1;
      const id2 = 3;
      const result = await table.query([id1, id2]);
      const expectedRows = [
        generateRow(id1, 'column awesome'),
        generateRow(id2, 'column random')
      ];

      expect(result).to.equal(expectedRows);

    }))

;
