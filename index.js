const rimraf = require('rimraf');
const {idbName} = require('./util/config');

rimraf.sync(idbName);

const {executeSteps} = require('./util/test-runner');

executeSteps(
  'validate-database',
  'create-database',
  'open-database',
  'validate-table',
  'create-a-table',
  'save-the-table',
  'validate-insert-rows',
  'insert-rows',
  'query-the-rows',
  'update-rows',
  'delete-rows',
  'revert-queries',
  'delete-a-table',
  'list-tables',
  'drop-database'
);
