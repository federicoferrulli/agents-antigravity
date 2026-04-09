const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');

const TEMPLATES = {
  rule: `---
title: {{title}}
description: "Inserire descrizione qui."
tags: [standard, clean-architecture]
---

# {{title}}

> [!NOTE]
> Inserire principio cardine della regola.

## Principio
...

## Esempi (Do / Don't)
...
`,
  skill: `---
title: {{title}}
description: "Inserire descrizione qui."
category: "General"
effort: "M"
tags: [skill, workflow]
---

# {{title}}

> [!TIP]
> Inserire suggerimento sull'uso della skill.

\`\`\`mermaid
graph TD
    A[Start] --> B[Process]
    B --> C[End]
\`\`\`

## Obiettivo
...

## Step da seguire
1. 
2. 
3. 
`,
  agent: `---
title: {{title}} Agent
description: "Inserire descrizione qui."
---

# {{title}} Agent

Sei un Ingegnere focalizzato su...

## Responsabilità
...

## Istruzioni Chiave
1. 
2. 
`
};

const DIRECTORIES = {
  rule: '.agents/rules',
  skill: '.agents/skills',
  agent: 'agents'
};

function printHelp() {
  console.log(`
Utilizzo: node create-asset.js --type <rule|skill|agent> --name "Nome Descrittivo"

Esempio:
  node create-asset.js --type skill --name "Database Migration"
  `);
  process.exit(0);
}

const args = process.argv.slice(2);
let type, name;

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--type') type = args[i + 1];
  if (args[i] === '--name') name = args[i + 1];
}

if (!type || !name || !TEMPLATES[type]) {
  console.error('❌ Errore: argomenti mancanti o tipo non valido.');
  printHelp();
}

const sanitizedName = name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
let targetPath;
const targetParentDir = path.join(ROOT_DIR, DIRECTORIES[type]);

if (type === 'skill') {
  const skillDir = path.join(targetParentDir, sanitizedName);
  if (!fs.existsSync(skillDir)) {
    fs.mkdirSync(skillDir, { recursive: true });
  }
  targetPath = path.join(skillDir, 'SKILL.md');
} else {
  targetPath = path.join(targetParentDir, sanitizedName + '.md');
}

if (!fs.existsSync(targetParentDir)) {
  fs.mkdirSync(targetParentDir, { recursive: true });
}

if (fs.existsSync(targetPath)) {
  console.error(`❌ Errore: Il file ${targetPath} esiste già.`);
  process.exit(1);
}

const content = TEMPLATES[type].replace('{{title}}', name);
fs.writeFileSync(targetPath, content, 'utf-8');

console.log(`✅ Asset creato con successo: ${targetPath}`);
console.log(`Esegui \`node scripts/generate-catalog.js\` per aggiornare l'indice se necessario.`);
