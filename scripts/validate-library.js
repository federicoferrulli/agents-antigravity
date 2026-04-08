const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

const DIRECTORIES_TO_CHECK = [
  '.agents/rules',
  '.agents/skills',
  'agents',
  '.agents/workflows'
];

// [SEC-1] Ensures that a resolved path does not escape the repository root
function isWithinRoot(resolvedPath) {
  return resolvedPath.startsWith(ROOT_DIR + path.sep) || resolvedPath === ROOT_DIR;
}

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

  // 3. Internal link check with path traversal protection [SEC-1]
  const linkRegex = /\]\.\/?([^)]+\.md)\)/g;
  let match;
  while ((match = linkRegex.exec(textContent)) !== null) {
      const linkPath = match[1];
      const possiblePath1 = path.resolve(path.dirname(filePath), linkPath);
      const possiblePath2 = path.resolve(ROOT_DIR, linkPath);

      // [SEC-1] Bail out immediately if the resolved path escapes the repo root
      if (!isWithinRoot(possiblePath1) && !isWithinRoot(possiblePath2)) {
        console.error(`❌ [Security] Path traversal rilevato in ${filePath}: "${linkPath}" punta fuori dalla root.`);
        errors++;
        continue;
      }

      if (!fs.existsSync(possiblePath1) && !fs.existsSync(possiblePath2)) {
         console.warn(`⚠️ [Warning Link] Link interno sospetto in ${filePath}: ${linkPath}`);
      }
  }

  // 4. Warn on insecure http:// links
  const httpRegex = /\]\(http:\/\//g;
  if (httpRegex.test(textContent)) {
    console.warn(`⚠️ [Warning Security] ${filePath} contiene link http:// non sicuri. Usa https://.`);
  }

  // 5. Check for empty file
  if (textContent.trim().length === 0) {
    console.error(`❌ [Style Error] ${filePath} è vuoto.`);
    errors++;
  }

  // 6. Check kebab-case naming (only for skills/ and docs/rules/)
  const fileName = path.basename(filePath, '.md');
  const isKebab = /^[a-z0-9]+(-[a-z0-9]+)*$/.test(fileName);
  if (!isKebab && !['README', 'GEMINI', 'base_agent'].includes(fileName)) {
    console.warn(`⚠️ [Warning Naming] ${filePath}: il nome file "${fileName}" non è in kebab-case.`);
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
