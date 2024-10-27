const path = require('path');
const fs = require('fs');

const DATA_PATH = path.join(
  path.dirname(require.main.filename),
  'datas',
  'videoList.json'
);

const video = {
  videoList: function () {
    return JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
  },
};

module.exports = video;
