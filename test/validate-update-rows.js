const InlineDB = require('inlinedb');
const {expect} = require('code');

const {idbName, tableName} = require('../util/config');

let idb,
  table;

module.exports = () =>
  when('validating updating rows')

    .then(given(() => {

      idb = new InlineDB(idbName);
      table = idb.createTable(tableName);

    }))

    .then(it('should throw if "update" is not a function', () => {

      const expectedError = 'Expected "update" to be a function, got undefined.';

      expect(() => table.update()).to.throw(expectedError);

    }))

    .then(it('should throw if "update" mutates the row', () => {

      const expectedError = 'Expected "update" to not mutate rows, got a function that will.';

      expect(() => table.update(row => row.newColumn = 'new column')).to.throw(expectedError);
      expect(() => table.update(row => row.column = 'changed')).to.throw(expectedError);
      expect(() => table.update(row => delete row.column)).to.throw(expectedError);

    }))

    .then(it('should throw if "update" does not return an object', () => {

      expect(() => table.update(() => null)).to.throw(
        'Expected "update" to return an object, got a function that will return null.'
      );
      expect(() => table.update(() => [])).to.throw(
        'Expected "update" to return an object, got a function that will return array.'
      );
      expect(() => table.update(() => {})).to.throw(
        'Expected "update" to return an object, got a function that will return undefined.'
      );
      expect(() => table.update(() => 1)).to.throw(
        'Expected "update" to return an object, got a function that will return number.'
      );

    }))

;
