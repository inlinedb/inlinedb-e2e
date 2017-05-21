const rimraf = require('rimraf');

const idbName = 'idb';
const idbFilename = `./${idbName}/.idb`;
const clean = () => rimraf.sync(`./${idbName}`);

module.exports = {
  clean,
  idbFilename,
  idbName
};
