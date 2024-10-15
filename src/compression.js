import fs from 'fs';
import { pipeline } from 'stream/promises';
import zlib from 'zlib';

export async function handleCompression(command, args) {
  try {
    if (command === 'compress') {
      await compressFile(args[0], args[1]);
    } else if (command === 'decompress') {
      await decompressFile(args[0], args[1]);
    } else {
      console.log('Invalid compression operation');
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

async function compressFile(filePath, destination) {
  const source = fs.createReadStream(filePath);
  const dest = fs.createWriteStream(destination);
  const brotli = zlib.createBrotliCompress();

  await pipeline(source, brotli, dest);
  console.log('File compressed');
}

async function decompressFile(filePath, destination) {
  const source = fs.createReadStream(filePath);
  const dest = fs.createWriteStream(destination);
  const brotli = zlib.createBrotliDecompress();

  await pipeline(source, brotli, dest);
  console.log('File decompressed');
}
