import fs from 'fs/promises';
import { createReadStream, createWriteStream } from 'fs';
import path from 'path';
import { pipeline } from 'stream/promises';

export async function handleFileOperations(command, args) {
  switch (command) {
    case 'cat':
      await readFile(args[0]);
      break;
    case 'add':
      await createFile(args[0]);
      break;
    case 'rn':
      await renameFile(args[0], args[1]);
      break;
    case 'cp':
      await copyFile(args[0], args[1]);
      break;
    case 'mv':
      await moveFile(args[0], args[1]);
      break;
    case 'rm':
      await deleteFile(args[0]);
      break;
    default:
      console.log('Operation failed');
  }
}

async function readFile(filePath) {
  const readStream = createReadStream(path.resolve(filePath), { encoding: 'utf-8' });

  readStream.on('data', (chunk) => console.log(chunk));

  readStream.on('error', (err) => {
    console.error('Operation failed:', err.message);
  });

  readStream.on('end', () => {
    console.log('File reading completed.');
  });
}

async function createFile(fileName) {
  try {
    await fs.writeFile(path.resolve(fileName), '', { flag: 'wx' });
    console.log('File created');
  } catch (err) {
    if (err.code === 'EEXIST') {
      console.error('Operation failed: File already exists.');
    } else {
      console.error('Operation failed:', err.message);
    }
  }
}

async function renameFile(filePath, newFileName) {
  try {
    await fs.rename(path.resolve(filePath), path.resolve(newFileName));
    console.log('File renamed');
  } catch (err) {
    console.error('Operation failed:', err.message);
  }
}

async function copyFile(filePath, destination) {
  const sourcePath = path.resolve(filePath);
  const destinationPath = path.resolve(destination, path.basename(filePath));

  try {
    await fs.access(sourcePath);
    await fs.access(destination);

    const source = createReadStream(sourcePath);
    const dest = createWriteStream(destinationPath);

    await pipeline(source, dest);

    console.log('File copied successfully');
  } catch (err) {
    console.error('Operation failed:', err.message);
  }
}

async function moveFile(filePath, destination) {
  const sourcePath = path.resolve(filePath);
  const destinationPath = path.resolve(destination, path.basename(filePath));

  try {
    await fs.access(sourcePath);

    const source = createReadStream(sourcePath);
    const dest = createWriteStream(destinationPath);

    await pipeline(source, dest);

    await fs.unlink(sourcePath);

    console.log('File moved successfully');
  } catch (err) {
    console.error('Operation failed:', err.message);
  }
}

async function deleteFile(filePath) {
  try {
    await fs.unlink(path.resolve(filePath));
    console.log('File deleted');
  } catch (err) {
    console.error('Operation failed:', err.message);
  }
}
