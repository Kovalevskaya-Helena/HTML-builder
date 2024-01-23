const fs = require('fs/promises');
const path = require('node:path');
const PATH = path.join(__dirname, 'secret-folder');

const getFileSize = async (filePath) => {
  const { size } = await fs.stat(filePath);

  return size;
};

const getFiles = async (filesPath) => {
  const files = await fs.readdir(filesPath, { withFileTypes: true });

  const stats = files.map(async (file) => {
    const filePath = path.join(filesPath, file.name);

    if (file.isFile()) {
      const fileSize = await getFileSize(filePath);

      return `${file.name.split('.').join(' - ')} - ${fileSize} bytes`;
    }
  });

  const result = await Promise.all(stats);

  return result.flat();
};

getFiles(PATH).then((res) => {
  res.filter((data) => data).forEach((data) => console.log(data));
});
