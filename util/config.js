const rimraf = require('rimraf');

const idbName = 'idb';
const idbFilename = `./${idbName}/.idb`;
const clean = (location = idbName) => rimraf.sync(`./${location}`);

module.exports = {
  clean,
  idbFilename,
  idbName
};
