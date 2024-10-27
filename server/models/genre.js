const path = require('path');
const fs = require('fs');

const DATA_PATH = path.join(
  path.dirname(require.main.filename),
  'datas',
  'genreList.json'
);

const movie = {
  genre: function () {
    return JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
  },
};

module.exports = movie;
