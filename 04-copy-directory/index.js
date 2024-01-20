const fs = require('fs/promises');
const path = require('node:path');

const PATH = path.join(__dirname, 'files');
const PATHCOPY = path.join(__dirname, 'files-copy');

fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, (err) => {
  if (err) throw err;
});

fs.readdir(PATH).then((files) => {
  files.forEach((file) => {
    fs.copyFile(path.join(PATH, file), path.join(PATHCOPY, file), 0, (err) => {
      throw err;
    });
  });
});
