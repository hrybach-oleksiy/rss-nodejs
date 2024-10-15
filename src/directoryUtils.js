import { cwd, chdir } from 'process';
import path from 'path';

export function goUp() {
  try {
    const currentDir = cwd();
    if (path.parse(currentDir).root !== currentDir) {
      const parentDir = path.join(currentDir, '..');
      chdir(parentDir);
    }
  } catch (err) {
    console.error('Error while moving up a directory:', err.message);
  }
}

export function changeDirectory(dir) {
  try {
    const newPath = path.resolve(cwd(), dir);
    chdir(newPath);
    console.log(`Changed directory to: ${newPath}`);
  } catch (err) {
    console.error(`Error changing directory to ${dir}:`, err.message);
  }
}

export function printCurrentDirectory() {
  try {
    console.log(`You are currently in ${cwd()}`);
  } catch (err) {
    console.error('Error printing current directory:', err.message);
  }
}
