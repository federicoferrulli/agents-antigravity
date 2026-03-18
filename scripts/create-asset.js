const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');

const TEMPLATES = {
  rule: `# {{title}}\n\nDescrizione breve della regola o standard.\n\n## Principio\n...\n\n## Esempi (Do / Don't)\n...\n`,
  skill: `# {{title}}\n\nContesto: Quando utilizzare questo workflow.\n\n## Obiettivo\n...\n\n## Step da seguire\n1. \n2. \n3. \n`,
  agent: `# {{title}}\n\nSei un Ingegnere focalizzato su...\n\n## Responsabilità\n...\n\n## Istruzioni Chiave\n1. \n2. \n`
};

const DIRECTORIES = {
  rule: 'docs/rules',
  skill: 'skills',
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

const sanitizedFileName = name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') + '.md';
const targetDir = path.join(ROOT_DIR, DIRECTORIES[type]);
const targetPath = path.join(targetDir, sanitizedFileName);

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

if (fs.existsSync(targetPath)) {
  console.error(`❌ Errore: Il file ${targetPath} esiste già.`);
  process.exit(1);
}

const content = TEMPLATES[type].replace('{{title}}', name);
fs.writeFileSync(targetPath, content, 'utf-8');

console.log(`✅ Asset creato con successo: ${targetPath}`);
console.log(`Esegui \`node scripts/generate-catalog.js\` per aggiornare l'indice se necessario.`);
