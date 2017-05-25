const InlineDB = require('inlinedb');
const {expect} = require('code');

const {idbName} = require('../util/config');

let idb;

module.exports = () =>
  when('opening the database')

    .then(given(() => {

      idb = new InlineDB(idbName);

    }))

    .then(it('should read the configuration', () => {

      const expectedConfig = {
        idbName,
        tables: {}
      };

      expect(idb.idbConfig).to.equal(expectedConfig);

    }))

;
