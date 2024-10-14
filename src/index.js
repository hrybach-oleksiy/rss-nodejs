import { createInterface } from 'readline';
// import os from 'os';
import path from 'path';
import { homedir } from 'os';
import { chdir, cwd } from 'process';
import { listDirectory } from './listDirectory.js';
import { handleFileOperations } from './fileOperations.js';
import { handleHashOperations } from './hashOperations.js';

const username = process.argv.find((arg) => arg.startsWith('--username=')).split('=')[1] || 'User';
console.log(`Welcome to the File Manager, ${username}!`);

let currentDir = homedir();
chdir(currentDir);
printCurrentDirectory();

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'Enter command: ',
});

rl.prompt();

rl.on('line', async (line) => {
  const [command, ...args] = line.trim().split(' ');

  switch (command) {
    case 'up':
      goUp();
      break;
    case 'cd':
      changeDirectory(args[0]);
      break;
    case 'ls':
      await listDirectory();
      break;
    case 'cat':
    case 'add':
    case 'rn':
    case 'cp':
    case 'mv':
    case 'rm':
      await handleFileOperations(command, args);
      break;
    case 'hash':
      await handleHashOperations(args[0]);
      break;
    case '.exit':
      console.log(`Thank you for using File Manager, ${username}, goodbye!`);
      rl.close();
      return;
    default:
      console.log('Invalid input');
  }

  printCurrentDirectory();
  rl.prompt();
}).on('close', () => {
  //  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  process.exit(0);
});

function goUp() {
  if (path.parse(currentDir).root !== currentDir) {
    currentDir = path.join(currentDir, '..');
    chdir(currentDir);
  }
}

function changeDirectory(dir) {
  const newPath = path.resolve(currentDir, dir);
  chdir(newPath);
  currentDir = cwd();
}

// rl.on('close', () => {
//   console.log(`Thank you for using File Manager, ${username}, goodbye!`);
// });

function printCurrentDirectory() {
  console.log(`You are currently in ${currentDir}`);
}
