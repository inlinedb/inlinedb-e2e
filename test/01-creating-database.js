const InlineDB = require('inlinedb');
const {expect} = require('code');
const fs = require('fs');
const {clean} = require('../util/helper');

describe('01 - Creating a new database', () => {

  clean();

  const idbName = 'idb';
  const idbFilename = `./${idbName}/.idb`;

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
