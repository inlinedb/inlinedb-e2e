const rimraf = require('rimraf');

const clean = () => rimraf.sync('./test');

clean();

require('./util/test-runner');

require('./scripts/01-creating-database');
require('./scripts/02-opening-database');
