const chalk = require('chalk');

const log = (...args) => console.log(...args); // eslint-disable-line no-console

global.when = title => {

  log('\n', `when ${chalk.bold.blue(title)}`);

  return Promise.resolve(title);

};

global.given = setup => async () => await setup();

global.it = (description, testFunction) =>
  () => new Promise(async (resolve, reject) => {

    try {

      await testFunction();

      log('\t✔', `it ${chalk.green(description)}`);

      resolve();

    } catch (error) {

      log('\t✖', `it ${chalk.red(description)}`);
      log('\n', chalk.red(error.stack), '\n');

      reject();

    }

  });

const stopRunningTests = () => {

  log('\n', chalk.red('Stopping tests. Could not proceed due to an error'), '\n');

  process.exit(1);

};

const step = test =>
  require(`../test/${test}`);

const executeSteps = async (...steps) =>
  await steps
    .reduce(
      (firstStep, nextStep) => firstStep.then(step(nextStep)),
      Promise.resolve()
    )
    .catch(stopRunningTests);

module.exports = {
  executeSteps
};
