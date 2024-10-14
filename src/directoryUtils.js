import { cwd, chdir } from 'process';
import path from 'path';

export function goUp() {
  const currentDir = cwd();
  if (path.parse(currentDir).root !== currentDir) {
    const parentDir = path.join(currentDir, '..');
    chdir(parentDir);
  }
}

export function changeDirectory(dir) {
  const newPath = path.resolve(cwd(), dir);
  chdir(newPath);
}

export function printCurrentDirectory() {
  console.log(`You are currently in ${cwd()}`);
}
