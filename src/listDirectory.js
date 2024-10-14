import { promises as fs } from 'fs';
import path from 'path';

export async function listDirectory() {
  try {
    const currentDir = process.cwd();
    const files = await fs.readdir(currentDir, { withFileTypes: true });

    const directories = files
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => ({ Name: dirent.name, Type: 'Directory' }));

    const regularFiles = files
      .filter((dirent) => dirent.isFile())
      .map((dirent) => ({ Name: dirent.name, Type: 'File' }));

    const sortedContent = [
      ...directories.sort((a, b) => a.Name.localeCompare(b.Name)),
      ...regularFiles.sort((a, b) => a.Name.localeCompare(b.Name)),
    ];

    console.table(sortedContent);
  } catch (err) {
    console.error('Operation failed');
  }
}
