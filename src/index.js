import { createInterface } from 'readline';
// import os from 'os';
import path from 'path';
import { homedir } from 'os';
import { chdir, cwd } from 'process';

const username = process.argv.find((arg) => arg.startsWith('--username=')).split('=')[1] || 'User';
console.log(`Welcome to the File Manager, ${username}!`);

let currentDir = homedir();
chdir(currentDir);
printCurrentDirectory();

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  // prompt: 'Enter command: ',
});

// rl.prompt();

rl.on('line', (line) => {
  if (line === '.exit') {
    rl.close();
  }
});

rl.on('close', () => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
});

function printCurrentDirectory() {
  console.log(`You are currently in ${currentDir}`);
}
