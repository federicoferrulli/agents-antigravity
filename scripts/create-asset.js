const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const TEMPLATES_DIR = path.join(__dirname, 'templates');

const DIRECTORIES = {
  rule: '.agents/rules',
  skill: '.agents/skills',
  workflow: '.agents/workflows'
};

function printHelp() {
  console.log(`
Utilizzo: node create-asset.js --type <rule|skill|workflow> --name "Nome Descrittivo"

Esempio:
  node create-asset.js --type skill --name "Database Migration"
  `);
  process.exit(0);
}

function getTemplate(type) {
  const templatePath = path.join(TEMPLATES_DIR, `${type}.md`);
  if (!fs.existsSync(templatePath)) {
    throw new Error(`Template per il tipo "${type}" non trovato in ${templatePath}`);
  }
  return fs.readFileSync(templatePath, 'utf-8');
}

const args = process.argv.slice(2);
let type, name;

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--type') type = args[i + 1];
  if (args[i] === '--name') name = args[i + 1];
}

if (!type || !name || !DIRECTORIES[type]) {
  console.error('❌ Errore: argomenti mancanti o tipo non valido.');
  printHelp();
}

try {
  const sanitizedName = name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  const template = getTemplate(type);
  
  const targetParentDir = path.join(ROOT_DIR, DIRECTORIES[type]);
  let targetPath;

  if (type === 'skill') {
    const skillDir = path.join(targetParentDir, sanitizedName);
    if (!fs.existsSync(skillDir)) {
      fs.mkdirSync(skillDir, { recursive: true });
    }
    targetPath = path.join(skillDir, 'SKILL.md');
  } else {
    if (!fs.existsSync(targetParentDir)) {
      fs.mkdirSync(targetParentDir, { recursive: true });
    }
    targetPath = path.join(targetParentDir, sanitizedName + '.md');
  }

  if (fs.existsSync(targetPath)) {
    console.error(`❌ Errore: Il file ${targetPath} esiste già.`);
    process.exit(1);
  }

  const content = template.replace(/{{title}}/g, name);
  fs.writeFileSync(targetPath, content, 'utf-8');

  console.log(`✅ Asset creato con successo: ${targetPath}`);
} catch (error) {
  console.error(`❌ Errore critico: ${error.message}`);
  process.exit(1);
}
