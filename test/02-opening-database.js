const InlineDB = require('inlinedb');
const {expect} = require('code');

describe('02 - Opening an existing database', () => {

  const idbName = 'idb';
  const idb = new InlineDB(idbName);

  it('should read the configuration', () => {

    const expectedConfig = {
      idbName,
      tables: {}
    };

    expect(idb.idbConfig).to.equal(expectedConfig);

  });

});
