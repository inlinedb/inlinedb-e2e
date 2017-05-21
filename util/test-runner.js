const chalk = require('chalk');

const log = (...args) => console.log(...args); // eslint-disable-line no-console

global.given = title => log('\n', chalk.bold.blue(title));
global.run = (description, testFunction) => {

  try {

    testFunction();

    log('\t✔', chalk.green(description));

  } catch (error) {

    log('\t✖', chalk.red(description));
    log('\n\t\t', chalk.red(error), '\n');

  }

};
