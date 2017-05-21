const InlineDB = require('inlinedb');
const {expect} = require('code');
const fs = require('fs');
const {clean, idbFilename, idbName} = require('../util/config');

describe('01 - Creating a new database', () => {

  clean();

  new InlineDB(idbName);

  it('should create idb config file', () => {

    expect(() => fs.statSync(idbFilename)).to.not.throw();

  });

  it('should write default configuration', done => {

    const expectedConfig = {
      idbName,
      tables: {}
    };

    fs.readFile(idbFilename, (err, config) => {

      expect(err).to.not.exist();

      expect(JSON.parse(config.toString())).to.equal(expectedConfig);

      done();

    });

  });

});
