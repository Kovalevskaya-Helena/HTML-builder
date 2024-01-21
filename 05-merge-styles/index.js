const fs = require('fs/promises');
const path = require('node:path');

const PATH = path.join(__dirname, 'styles');
const PATHBUNDLE = path.join(__dirname, 'project-dist', 'bundle.css');

fs.rm(PATHBUNDLE, { recursive: true, force: true });

fs.readdir(PATH, { withFileTypes: true }).then((files) => {
  files.forEach((file) => {
    if (file.isFile() && path.extname(file.name) === '.css') {
      fs.readFile(path.join(PATH, file.name), { encoding: 'utf-8' }, (err) => {
        if (err) {
          throw err;
        }
      }).then((data) => fs.appendFile(PATHBUNDLE, `${data}\n`));
    }
  });
});
