const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function runCommand(command) {
    try {
        console.log(`Running: ${command}`);
        return execSync(command, { encoding: 'utf-8' }).trim();
    } catch (error) {
        console.error(`Error executing command: ${command}`);
        console.error(error.stderr || error.message);
        process.exit(1);
    }
}

function getPackageVersion() {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    return packageJson.version;
}

function manageTags() {
    const version = getPackageVersion();
    const tagName = `v${version}`;

    // 1. Check if tag exists
    const existingTags = runCommand('git tag -l');
    if (existingTags.split('\n').includes(tagName)) {
        console.log(`Tag ${tagName} already exists.`);

        // Option to delete and recreate or just skip
        // For now, let's just inform.
        return;
    }

    // 2. Add and commit everything
    console.log('Staging changes...');
    runCommand('git add .');

    try {
        runCommand(`git commit -m "chore: release ${tagName}"`);
    } catch (e) {
        console.log('Nothing to commit or commit failed (maybe no changes).');
    }

    // 3. Create tag
    console.log(`Creating tag ${tagName}...`);
    runCommand(`git tag -a ${tagName} -m "Release ${tagName}"`);
    console.log(`Successfully created tag ${tagName}`);
    runCommand(`git pull --tags`);
    runCommand(`git push`);
}

const action = process.argv[2] || 'create';

if (action === 'create') {
    manageTags();
} else if (action === 'list') {
    console.log(runCommand('git tag -n'));
} else if (action === 'delete') {
    const tagToDelete = process.argv[3];
    if (!tagToDelete) {
        console.error('Specify a tag to delete.');
    } else {
        runCommand(`git tag -d ${tagToDelete}`);
        console.log(`Deleted tag ${tagToDelete}`);
    }
} else {
    console.log('Usage: node scripts/manage-tags.js [create|list|delete <tag>]');
}
