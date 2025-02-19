import { writeFileSync } from 'fs';

const fullVersion = process.env.VERSION;

writeFileSync('public/version.json', JSON.stringify({ version: fullVersion }));
