const fs = require('fs');
const path = require('path');

function parseCSV(filePath) {
  const data = fs.readFileSync(filePath, 'utf-8');
  const lines = data.split('\n').filter(Boolean);
  const headers = lines[0].split(';');
  return lines.slice(1).map(line => {
    const values = line.split(';');
    return headers.reduce((obj, header, idx) => {
      obj[header.trim()] = values[idx] ? values[idx].trim() : null;
      return obj;
    }, {});
  });
}

module.exports = parseCSV;
