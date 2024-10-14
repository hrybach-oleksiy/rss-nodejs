import fs from 'fs';
import crypto from 'crypto';

export async function handleHashOperations(filePath) {
  try {
    const hash = crypto.createHash('sha256');

    if (!fs.existsSync(filePath)) {
      throw new Error(`File does not exist: ${filePath}`);
    }

    const stream = fs.createReadStream(filePath);

    stream.on('data', (data) => hash.update(data));

    stream.on('end', () => {
      console.log(`Hash: ${hash.digest('hex')}`);
    });

    stream.on('error', (err) => {
      console.error(`Error reading file: ${err.message}`);
    });
  } catch (err) {
    console.error(`Error processing file for hashing: ${err.message}`);
  }
}
