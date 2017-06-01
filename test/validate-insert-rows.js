const InlineDB = require('inlinedb');
const {expect} = require('code');

const {idbName, tableName} = require('../util/config');

let idb,
  table;

module.exports = () =>
  when('validating inserting rows')

    .then(given(() => {

      idb = new InlineDB(idbName);
      table = idb.createTable(tableName);

    }))

    .then(it('should throw if there are no rows', () => {

      const expectedError = 'Expected one or more rows to insert, got 0.';

      expect(() => table.insert()).to.throw(expectedError);

    }))

    .then(it('should test if each row is an object', () => {

      expect(() => table.insert({a: 1}, 2)).to.throw('Expected row to be an object, got number at 1.');
      expect(() => table.insert({a: 1}, {a: 2}, '3')).to.throw('Expected row to be an object, got string at 2.');
      expect(() => table.insert(() => {})).to.throw('Expected row to be an object, got function at 0.');
      expect(() => table.insert({a: 1}, null)).to.throw('Expected row to be an object, got null at 1.');
      expect(() => table.insert([], {a: 1})).to.throw('Expected row to be an object, got array at 0.');

    }))

;
