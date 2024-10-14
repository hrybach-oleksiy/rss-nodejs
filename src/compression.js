import fs from 'fs';
import { pipeline } from 'stream/promises';
import zlib from 'zlib';

export async function handleCompression(command, args) {
  const [source, destination] = args;

  if (command === 'compress') {
    await compressFile(source, destination);
  } else if (command === 'decompress') {
    await decompressFile(source, destination);
  }
}

async function compressFile(filePath, destination) {
  try {
    const fileStats = fs.stat(filePath);
    if (fileStats.isDirectory()) {
      throw new Error('The source path must be a file, not a directory.');
    }

    if (destination.endsWith('/')) {
      throw new Error('The destination must include a file name.');
    }

    const source = createReadStream(filePath);
    const dest = createWriteStream(destination);
    const brotli = createBrotliCompress();

    // await pipeline(source, brotli, dest);
    await source.pipe(brotli).pipe(dest);
    console.log('File compressed successfully to', destination);
  } catch (err) {
    console.error('Operation failed:', err.message);
  }
}

async function decompressFile(filePath, destination) {
  const source = fs.createReadStream(filePath);
  const dest = fs.createWriteStream(destination);
  const brotli = zlib.createBrotliDecompress();

  await pipeline(source, brotli, dest);
  console.log('File decompressed');
}
