import { execSync } from 'child_process';
import { writeFileSync } from 'fs';

const lastTag = execSync('git describe --tags --abbrev=0').toString().trim();

const version = lastTag.replace('Release-', '');

const commitCount = execSync(`git rev-list --count ${lastTag}..HEAD`).toString().trim();

const versionParts = version.split('.');
if (commitCount !== '0' && versionParts.length > 2) {
    versionParts[2] = (parseInt(versionParts[2], 10) + 1).toString();
}

const paddedCommitCount = commitCount.padStart(3, '0');

const newVersion = versionParts.join('.');
const fullVersion = commitCount === '0' ? version : `${newVersion}-RC${paddedCommitCount}`;

writeFileSync('public/version.json', JSON.stringify({ version: fullVersion }));