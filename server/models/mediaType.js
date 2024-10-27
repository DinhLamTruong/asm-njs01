const path = require('path');
const fs = require('fs');

const DATA_PATH = path.join(
  path.dirname(require.main.filename),
  'datas',
  'mediaTypeList.json'
);

const mediaType = {
  mediaType: function () {
    return JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
  },
};
