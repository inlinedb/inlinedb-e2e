const fs = require('fs');

module.exports = {

  fileExists(filename) {

    return fs.statSync(filename);

  },

  readFile(filename) {

    return new Promise(
      resolve => fs.readFile(
        filename,
        (err, data) => resolve({
          data,
          err
        })
      )
    );

  }

};
