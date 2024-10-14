import fs from 'fs';
import crypto from 'crypto';

export async function handleHashOperations(filePath) {
  const hash = crypto.createHash('sha256');
  const stream = fs.createReadStream(filePath);

  stream.on('data', (data) => hash.update(data));
  stream.on('end', () => {
    console.log(`Hash: ${hash.digest('hex')}`);
  });
}
