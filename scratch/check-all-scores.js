const fs = require('fs');
const path = require('path');
const { evaluate } = require('../scripts/evaluate-md-quality');

function getFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(getFiles(file));
        } else if (file.endsWith('.md')) {
            results.push(file);
        }
    });
    return results;
}

const files = getFiles('.agents');
console.log('| File | Score |');
console.log('| :--- | :--- |');
files.forEach(f => {
    const score = evaluate(f);
    console.log(`| ${f} | ${score} |`);
});
