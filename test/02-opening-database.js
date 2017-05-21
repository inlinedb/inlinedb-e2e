const InlineDB = require('inlinedb');
const {expect} = require('code');
const {idbName} = require('../util/config');

describe('02 - Opening an existing database', () => {

  const idb = new InlineDB(idbName);

  it('should read the configuration', () => {

    const expectedConfig = {
      idbName,
      tables: {}
    };

    expect(idb.idbConfig).to.equal(expectedConfig);

  });

});
