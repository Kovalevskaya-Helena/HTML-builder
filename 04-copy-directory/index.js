const fs = require('fs/promises');
const path = require('node:path');
const PATH = path.join(__dirname, 'files');
const PATHCOPY = path.join(__dirname, 'files-copy');

const copy = async () => {
  await fs.rm(PATHCOPY, { force: true, recursive: true });

  await fs.mkdir(PATHCOPY, { recursive: true }, (err) => {
    if (err) throw err;
  });

  fs.readdir(PATH).then((files) => {
    files.forEach((file) => {
      fs.copyFile(
        path.join(PATH, file),
        path.join(PATHCOPY, file),
        0,
        (err) => {
          throw err;
        },
      );
    });
  });
};
copy();
