const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');

const DIRECTORIES_TO_CHECK = [
  'docs/rules',
  'skills',
  'agents',
  '.agent/workflows'
];

let errors = 0;

function validateFile(filePath) {
  const content = fs.readFileSync(filePath);
  
  // 1. Check for UTF-8 and no weird encoding bytes
  // Rilevamento molto basilare di BOM o caratteri non utf-8.
  if (content[0] === 0xFF && content[1] === 0xFE) {
    console.error(`❌ [Encoding Error] ${filePath} sembra UTF-16LE. Convertilo in UTF-8.`);
    errors++;
    return;
  }

  const textContent = content.toString('utf-8');
  
  // 2. Check for H1 Title
  const hasH1 = /^#\s+.+/m.test(textContent);
  if (!hasH1 && path.basename(filePath).toLowerCase() !== 'gemini.md' && path.basename(filePath).toLowerCase() !== 'readme.md') {
    console.error(`❌ [Style Error] ${filePath} manca di un titolo principale (H1, ex: "# Titolo").`);
    errors++;
  }

  // 3. Very basic broken internal link check (relative links)
  const linkRegex = /\]\(\.\/?([^\)]+\.md)\)/g;
  let match;
  while ((match = linkRegex.exec(textContent)) !== null) {
      const linkPath = match[1];
      // Normalize link relative to the file's directory
      const absoluteLink = path.join(path.dirname(filePath), linkPath);
      // But wait: most of our links might be relative to repo root (like in README or workflows).
      // Se il link inizia con ./ e siamo nella root, controlliamo.
      // Eseguiamo un controllo raw assoluto rispetto alla root se inizia con docs/ o skills/
      let possiblePath1 = path.join(path.dirname(filePath), linkPath);
      let possiblePath2 = path.join(ROOT_DIR, linkPath);
      
      if (!fs.existsSync(possiblePath1) && !fs.existsSync(possiblePath2)) {
         console.warn(`⚠️ [Warning Link] Link interno sospetto in ${filePath}: ${linkPath}`);
      }
  }
}

function scanDirCheck(dir) {
  const fullPath = path.join(ROOT_DIR, dir);
  if (!fs.existsSync(fullPath)) return;

  const files = fs.readdirSync(fullPath);
  for (const file of files) {
      const itemPath = path.join(fullPath, file);
      if (fs.statSync(itemPath).isDirectory()) {
          // Recursion rarely needed here but just in case
      } else if (file.endsWith('.md')) {
          validateFile(itemPath);
      }
  }
}

console.log('🔍 Inizio validazione della libreria...');

DIRECTORIES_TO_CHECK.forEach(scanDirCheck);
validateFile(path.join(ROOT_DIR, 'README.md'));
validateFile(path.join(ROOT_DIR, 'GEMINI.md'));

if (errors > 0) {
    console.error(`\n❌ La validazione ha fallito con ${errors} errore/i. Corrections required.`);
    process.exit(1);
} else {
    console.log('\n✅ Validazione superata! Tutti i file Markdown rispettano i requisiti di base.');
}
