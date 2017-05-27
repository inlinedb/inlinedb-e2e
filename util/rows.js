const generateRow = ($idbID, column) => ({
  $idbID,
  column
});

const generateRows = (...columns) => columns.map((column, index) => generateRow(index + 1, column));

module.exports = {
  generateRow,
  generateRows
};
