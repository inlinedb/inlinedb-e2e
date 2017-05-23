const rimraf = require('rimraf');

const idbName = 'idb';
const idbFilename = `./${idbName}/.idb`;
const tableName = 'table-name';
const tableFilename = `./${idbName}/${tableName}.table`;

const clean = (location = idbName) => rimraf.sync(`./${location}`);

module.exports = {
  clean,
  idbFilename,
  idbName,
  tableFilename,
  tableName
};
