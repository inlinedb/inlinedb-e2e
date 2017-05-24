const InlineDB = require('inlinedb');
const {expect} = require('code');
const fs = require('fs');
const {
  idbName: name,
  tableName
} = require('../util/config');

describe('04 - Saving a table', () => {

  const idbName = `${name}-table`;
  const tableFilename = `./${idbName}/${tableName}.table`;

  const idb = new InlineDB(idbName);
  const table = idb.createTable(tableName);

  it('should not have created the table yet', () => {

    expect(() => fs.statSync(tableFilename)).to.throw();

  });

  it('should create the table on save', async () => {

    const expectedData = {
      index: {},
      rows: []
    };

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