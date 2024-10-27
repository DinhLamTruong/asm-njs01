const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(
  path.dirname(require.main.filename),
  'datas',
  'movieList.json'
);

const movie = {
  all: function () {
    return JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
  },
};

module.exports = movie;
