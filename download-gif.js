import fs from 'node:fs';
import { Readable } from 'node:stream';
import { finished } from 'node:stream/promises';

console.log("Starting download...");
try {
    const stream = fs.createWriteStream('./public/cat-love.gif');
    const response = await fetch('https://cataas.com/cat/gif?tags=love');

    if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);

    await finished(Readable.fromWeb(response.body).pipe(stream));
    console.log('Download complete');
} catch (error) {
    console.error('Download failed:', error);
    process.exit(1);
}
