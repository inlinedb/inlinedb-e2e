const InlineDB = require('inlinedb');
const {expect} = require('code');

const {fileExists} = require('../util/file');
const {idbName} = require('../util/config');

const idbLocation = `./${idbName}`;
let idb;

module.exports = () =>
  when('dropping a database')

    .then(given(() => idb = new InlineDB(idbName)))

    .then(it('should exist in the system', () => {

      expect(() => fileExists(idbLocation)).to.not.throw();

    }))

    .then(it('should remove the database from system on drop', () => {

      idb.drop();

      expect(() => fileExists(idbLocation)).to.throw();

    }))

;
