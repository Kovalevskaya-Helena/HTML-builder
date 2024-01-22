const fs = require('fs/promises');
const path = require('node:path');

const DIST_DIR = 'project-dist';

const createBundleDir = async () => {
  await fs.rm(path.join(__dirname, DIST_DIR), {
    recursive: true,
    force: true,
  });

  await fs.mkdir(path.join(__dirname, DIST_DIR), { recursive: true }, (err) => {
    if (err) {
      throw err;
    }
  });
};

const compileCss = async () => {
  const PATH = path.join(__dirname, 'styles');
  const PATHSTYLES = path.join(__dirname, DIST_DIR, 'style.css');

  const files = await fs.readdir(PATH, { withFileTypes: true });

  for (const file of files) {
    if (file.isFile() && path.extname(file.name) === '.css') {
      const data = await fs.readFile(path.join(PATH, file.name), {
        encoding: 'utf-8',
      });

      fs.appendFile(PATHSTYLES, `${data}\n`);
    }
  }
};

const copyDirs = async (copyFrom, copyTo) => {
  await fs.mkdir(copyTo, { recursive: true }, (err) => {
    if (err) throw err;
  });

  const files = await fs.readdir(copyFrom, { withFileTypes: true });

  for (const file of files) {
    if (file.isDirectory()) {
      await copyDirs(
        path.join(copyFrom, file.name),
        path.join(copyTo, file.name),
      );
    } else {
      await fs.copyFile(
        path.join(copyFrom, file.name),
        path.join(copyTo, file.name),
        0,
        (err) => {
          throw err;
        },
      );
    }
  }
};

const compileHtml = async () => {
  await fs.copyFile(
    path.join(__dirname, 'template.html'),
    path.join(__dirname, DIST_DIR, 'index.html'),
    0,
    (err) => {
      throw err;
    },
  );

  const files = await fs.readdir(path.join(__dirname, 'components'), {
    withFileTypes: true,
  });

  for (const file of files) {
    if (path.extname(file.name) === '.html') {
      const data = await fs.readFile(
        path.join(__dirname, 'components', file.name),
        {
          encoding: 'utf-8',
        },
      );

      const indexHTML = await fs.readFile(
        path.join(__dirname, DIST_DIR, 'index.html'),
        {
          encoding: 'utf-8',
        },
      );

      await fs.writeFile(
        path.join(__dirname, DIST_DIR, 'index.html'),
        indexHTML.replaceAll(`{{${file.name.split('.')[0]}}}`, data),
      );
    }
  }
};

const compileAssets = async () => {
  await copyDirs(
    path.join(__dirname, 'assets'),
    path.join(__dirname, DIST_DIR, 'assets'),
  );
};

const createBundle = async () => {
  await createBundleDir();
  await compileAssets();
  await compileCss();
  await compileHtml();
};

createBundle();
