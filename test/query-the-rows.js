const InlineDB = require('inlinedb');
const {expect} = require('code');

const {idbName, tableName} = require('../util/config');

let idb,
  table;

module.exports = () =>
  when('querying rows from the table')

    .then(given(() => {

      idb = new InlineDB(idbName);
      table = idb.createTable(tableName);

    }))

    .then(it('should return all the rows when there is no filter', async () => {

      const expectedRows = [
        {
          $idbID: 1,
          column: 'column awesome'
        },
        {
          $idbID: 2,
          column: 'column match'
        },
        {
          $idbID: 3,
          column: 'column random'
        }
      ];

      const result = await table.query();

      expect(result).to.equal(expectedRows);

    }))

    .then(it('should return the rows satisfied by a filter function', async () => {

      const filterFunction = row => row.column === 'column match';
      const result = await table.query(filterFunction);
      const expectedRows = [
        {
          $idbID: 2,
          column: 'column match'
        }
      ];

      expect(result).to.equal(expectedRows);

    }))

    .then(it('should return the row with matching id', async () => {

      const id = 1;
      const result = await table.query(id);
      const expectedRows = [
        {
          $idbID: 1,
          column: 'column awesome'
        }
      ];

      expect(result).to.equal(expectedRows);

    }))

    .then(it('should return the rows with matching ids', async () => {

      const id1 = 1;
      const id2 = 3;
      const result = await table.query([id1, id2]);
      const expectedRows = [
        {
          $idbID: 1,
          column: 'column awesome'
        },
        {
          $idbID: 3,
          column: 'column random'
        }
      ];

      expect(result).to.equal(expectedRows);

    }))

;
