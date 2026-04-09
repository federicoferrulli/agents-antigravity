const fs = require('fs');
const path = require('path');

const files = [
    '.agents/rules/continuous-learning.md',
    '.agents/rules/database.md',
    '.agents/rules/python.md',
    '.agents/skills/api-design/SKILL.md',
    '.agents/skills/documentation-standards/SKILL.md',
    '.agents/workflows/plan-skill.md',
    '.agents/workflows/sync-trace.md',
    '.agents/workflows/main-workflow.md'
];

files.forEach(f => {
    const fullPath = path.join(process.cwd(), f);
    if (!fs.existsSync(fullPath)) return;

    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Determine relative deepness
    const parts = f.split('/');
    const deepness = parts.length - 1;
    let relBase = '';
    for(let i=0; i<deepness; i++) relBase += '../';

    content = content.replace(/file:\/\/\/c:\/repository\/agents\//g, relBase);
    
    // Fix specific double links if any
    content = content.replace(/\.\.\/\.\.\/\.agents\/rules\/common\.md/g, relBase + '.agents/rules/common.md');

    fs.writeFileSync(fullPath, content);
    console.log(`Portability Fixed: ${f} (Base: ${relBase})`);
});
