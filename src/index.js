import { createInterface } from 'readline';
import { homedir } from 'os';
import { chdir } from 'process';
import { listDirectory } from './listDirectory.js';
import { handleFileOperations } from './fileOperations.js';
import { handleHashOperations } from './hashOperations.js';
import { handleCompression } from './compression.js';
import { handleOsOperations } from './osOperations.js';
import { goUp, changeDirectory, printCurrentDirectory } from './directoryUtils.js';

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
    case 'compress':
    case 'decompress':
      await handleCompression(command, args);
      break;
    case 'os':
      handleOsOperations(args);
      break;
    case '.exit':
      rl.close();
      break;
    default:
      console.log('Invalid input');
  }

  printCurrentDirectory();
  rl.prompt();
}).on('close', () => {
  process.stdout.write('\n');
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  process.exit(0);
});
