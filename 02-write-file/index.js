const fs = require('fs');
const path = require('node:path');
const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');

const FILE_PATH = path.join(__dirname, 'text.txt');

const createFile = () => {
  fs.open(FILE_PATH, 'w', (err) => {
    if (err) {
      console.error(err);
    }
  });
};

createFile();

const rl = readline.createInterface({ input, output });

const appendFIle = (msg) => {
  if (msg.toLowerCase() === 'exit') {
    rl.close();
  } else {
    fs.appendFile(FILE_PATH, `${msg}\n`, (err) => {
      if (err) {
        throw err;
      }
    });
  }
};

console.log('Hi, write something...');

rl.on('close', () => {
  console.log('Have a good day!');
});

rl.on('line', appendFIle);
