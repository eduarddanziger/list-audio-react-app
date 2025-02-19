import { writeFileSync } from 'fs';

let version;
version = process.env.VERSION;

if (version === undefined) {
  version = 'Developer Build';
}

writeFileSync('public/version.json', JSON.stringify({ version: version }));
