const InlineDB = require('inlinedb');
const {expect} = require('code');

const {fileExists, readFile} = require('../util/file');
const {idbName, idbFilename} = require('../util/config');

module.exports = () =>
  when('creating a new database')

    .then(given(() => new InlineDB(idbName)))

    .then(it('should create idb config file', () => {

      expect(() => fileExists(idbFilename)).to.not.throw();

    }))

    .then(it('should write default configuration', async () => {

      const expectedConfig = {
        idbName,
        tables: {}
      };

      const {err, data} = await readFile(idbFilename);

      expect(err).to.not.exist();
      expect(JSON.parse(data.toString())).to.equal(expectedConfig);

    }))

;
