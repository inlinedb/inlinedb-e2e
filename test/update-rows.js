const InlineDB = require('inlinedb');
const {expect} = require('code');

const {idbName, tableName, tableFilename} = require('../util/config');
const {generateRows} = require('../util/rows.js');
const {readFile} = require('../util/file');

let idb,
  table;

module.exports = () =>
  when('updating rows in the table')

    .then(given(() => {

      idb = new InlineDB(idbName);
      table = idb.createTable(tableName);

      table.insert({
        column: 'column insert'
      });
      table.update(
        () => Object.assign({column: 'column'})
      );

    }))

    .then(it('should not have updated the rows yet', async () => {

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

      const {err, data} = await readFile(tableFilename);

      expect(err).to.not.exist();
      expect(JSON.parse(data.toString())).to.equal(expectedData);

    }))

    .then(it('should update all the rows when there is no filter', async () => {

      const expectedRows = generateRows(
        'column',
        'column',
        'column',
        'column'
      );

      await table.save();

      const result = await table.query();

      expect(result).to.equal(expectedRows);

    }))

    .then(it('should update the row with matching id', async () => {

      const id = 1;
      const expectedRows = generateRows(
        'column awesome',
        'column',
        'column',
        'column'
      );

      table.update(
        () => ({column: 'column awesome'}),
        id
      );

      await table.save();

      const result = await table.query();

      expect(result).to.equal(expectedRows);

    }))

    .then(it('should update the rows satisfied by a filter function', async () => {

      const expectedRows = generateRows(
        'column match',
        'column',
        'column',
        'column'
      );

      table.update(
        () => ({column: 'column match'}),
        row => row.column === 'column awesome'
      );

      await table.save();

      const result = await table.query();

      expect(result).to.equal(expectedRows);

    }))

    .then(it('should return the rows with matching ids', async () => {

      const id1 = 3;
      const id2 = 4;
      const expectedRows = generateRows(
        'column match',
        'column',
        'column random',
        'column random'
      );

      table.update(
        () => ({column: 'column random'}),
        [id1, id2]
      );

      await table.save();

      const result = await table.query();

      expect(result).to.equal(expectedRows);

    }))

    .then(it('should have written all the changes into the table', async () => {

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

;
