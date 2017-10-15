const InlineDB = require('inlinedb');
const {expect} = require('code');

const {idbName, idbFilename} = require('../util/config');
const {readFile} = require('../util/file');

let idb;

module.exports = () =>
  when('listing the tables in database')

    .then(given(() => {

      idb = new InlineDB(idbName);

      idb.createTable('table-1');
      idb.createTable('table-2');
      idb.createTable('table-3');

    }))

    .then(it('should have the tables in idb', async () => {

      const expectedConfig = {
        idbName,
        tables: {
          'table-1': {},
          'table-2': {},
          'table-3': {}
        }
      };

      const {err, data} = await readFile(idbFilename);

      expect(err).to.not.exist();
      expect(JSON.parse(data.toString())).to.equal(expectedConfig);

    }))

    .then(it('should return an array of table names', () => {

      const expectedTables = [
        'table-1',
        'table-2',
        'table-3'
      ];

      expect(idb.listTables()).to.equal(expectedTables);

    }))

;
