const InlineDB = require('inlinedb');
const {expect} = require('code');

const {idbName, idbFilename, tableName} = require('../util/config');
const {readFile} = require('../util/file');

module.exports = () =>
  when('creating a new table in the database')

    .then(given(() => {

      const idb = new InlineDB(idbName);

      idb.createTable(tableName);

    }))

    .then(it('should add the table name to idb', async () => {

      const expectedConfig = {
        idbName,
        tables: {
          [tableName]: {}
        }
      };

      const {err, data} = await readFile(idbFilename);

      expect(err).to.not.exist();
      expect(JSON.parse(data.toString())).to.equal(expectedConfig);

    }))

;
