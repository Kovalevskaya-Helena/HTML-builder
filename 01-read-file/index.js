const fs = require('node:fs');
const path = require('node:path');

const readableStream = fs.createReadStream(path.join(__dirname, 'text.txt'), {
  encoding: 'utf8',
});

readableStream.on('data', (chunk) => {
  console.log(chunk);
});
