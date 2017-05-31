const InlineDB = require('inlinedb');
const {expect} = require('code');

const {idbName} = require('../util/config');

let idb;

module.exports = () =>
  when('validating table creation')

    .then(given(() => idb = new InlineDB(idbName)))

    .then(it('should throw if there is no table name', () => {

      const expectedError = 'Expected table name to be a string, got undefined.';

      expect(() => idb.createTable()).to.throw(expectedError);

    }))

    .then(it('should throw if table name is invalid', () => {

      const invalidNames = [
        'test ',
        'Test-',
        'test+',
        'test_',
        '_test',
        'te$st',
        'te#st',
        'tes%t',
        'te st',
        '^teAt',
        't*est',
        '(test)'
      ];

      invalidNames.forEach(filename => {

        const expectedError = `Expected ${filename} to match [a-zA-Z0-9]+([-_][a-zA-Z0-9]+)* pattern.`;

        expect(() => idb.createTable(filename)).to.throw(expectedError);

      });

    }))

    .then(it('should throw if table name is not a string', () => {

      const tableName = () => {};
      const expectedError = 'Expected table name to be a string, got function.';

      expect(() => idb.createTable(tableName)).to.throw(expectedError);

    }))

;
