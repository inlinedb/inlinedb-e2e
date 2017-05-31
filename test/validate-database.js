const InlineDB = require('inlinedb');
const {expect} = require('code');

const {idbFilename} = require('../util/config');
const {fileExists} = require('../util/file');

module.exports = () =>
  when('validating database creation')

    .then(it('should throw if there is no database name', () => {

      const expectedError = 'Expected database name to be a string, got undefined.';

      expect(() => new InlineDB()).to.throw(expectedError);

    }))

    .then(it('should throw if database name is invalid', () => {

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

        expect(() => new InlineDB(filename)).to.throw(expectedError);

      });

    }))

    .then(it('should throw if database name is not a string', () => {

      const idbName = () => {};
      const expectedError = 'Expected database name to be a string, got function.';

      expect(() => new InlineDB(idbName)).to.throw(expectedError);

    }))

    .then(it('should not have created idb config file', () => {

      expect(() => fileExists(idbFilename)).to.throw();

    }))

;
