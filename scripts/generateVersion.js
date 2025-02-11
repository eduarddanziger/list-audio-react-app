import { execSync } from 'child_process';
import { writeFileSync } from 'fs';

const lastTag = execSync('git describe --tags --abbrev=0').toString().trim();

const version = lastTag.replace('Release-', '');

const commitCount = execSync(`git rev-list --count ${lastTag}..HEAD`).toString().trim();

const fullVersion = `${version}.${commitCount}`;

writeFileSync('public/version.json', JSON.stringify({ version: fullVersion }));