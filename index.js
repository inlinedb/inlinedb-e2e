const chalk = require('chalk');
const rimraf = require('rimraf');

const clean = () => rimraf.sync('./test');
const log = (...args) => console.log(...args); // eslint-disable-line no-console

global.run = (description, testFunction) => {

  try {

    testFunction();

    log('✔', chalk.green(description));

  } catch (error) {

    log('✖', chalk.red(description));
    log('\n\t', chalk.red(error), '\n');

  }

};

clean();

require('./scripts/01-creating-database');
