const InlineDB = require('inlinedb');
const {expect} = require('code');
const fs = require('fs');
const {
  clean,
  idbName: name
} = require('../util/helper');

describe('05 - Inserting rows into a table', () => {

  const idbName = `${name}-table-dml`;
  const tableName = 'table-insertion';
  const tableFilename = `./${idbName}/${tableName}.table`;

  clean(idbName);

  const idb = new InlineDB(idbName);
  const table = idb.createTable(tableName);

  it('should not have created the table yet', () => {

    expect(() => fs.statSync(tableFilename)).to.throw();

  });

  it('should create the table on save', async () => {

    const expectedData = {
      index: {
        1: 0,
        2: 1,
        3: 2
      },
      lastInsertId: 3,
      rows: [
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
      ]

    };

    table.insert(
      {column: 'column awesome'},
      {column: 'column match'},
      {column: 'column random'}
    );

    await table.save();

    const stream = await new Promise(
      resolve => fs.readFile(
        tableFilename,
        (err, data) => resolve({
          data,
          err
        })
      )
    );

    expect(stream.err).to.not.exist();
    expect(JSON.parse(stream.data.toString())).to.equal(expectedData);

  });

});
