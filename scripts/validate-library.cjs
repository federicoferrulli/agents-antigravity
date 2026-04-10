const fs = require('fs');
const path = require('path');
const { evaluate } = require('./evaluate-md-quality.cjs');

const ROOT_DIR = path.resolve(__dirname, '..');

const DIRECTORIES_TO_CHECK = [
  '.agents/rules',
  '.agents/skills',
  '.agents/workflows',
  'docs/adr'
];

const MIN_SCORE = parseInt(process.env.ANTIGRAVITY_MIN_SCORE) || 100;

// [SEC-1] Ensures that a resolved path does not escape the repository root
function isWithinRoot(resolvedPath) {
  return resolvedPath.startsWith(ROOT_DIR + path.sep) || resolvedPath === ROOT_DIR;
}

let errors = 0;

function validateFile(filePath) {
  const content = fs.readFileSync(filePath);
  
  // 1. Check for UTF-8 and no weird encoding bytes
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

  // 3. Quality Score check (ENFORCED 100/100)
  const isIndexFile = ['readme.md', 'gemini.md'].includes(path.basename(filePath).toLowerCase());
  const scoreValue = evaluate(filePath);
  if (scoreValue < MIN_SCORE && !isIndexFile) {
    console.error(`❌ [Quality Error] ${filePath}: score di qualità insufficiente (${scoreValue}/${MIN_SCORE}).`);
    errors++;
  }

  // 4. Internal link check with path traversal protection [SEC-1]
  const linkRegex = /\]\((?!https?:\/\/|mailto:)([^#)]+\.md)(?:#[^)]*)?\)/g;
  let match;
  while ((match = linkRegex.exec(textContent)) !== null) {
      const linkPath = match[1];
      const resolvedPath = path.resolve(path.dirname(filePath), linkPath);

      if (!isWithinRoot(resolvedPath)) {
        console.error(`❌ [Security] Path traversal rilevato in ${filePath}: "${linkPath}" punta fuori dalla root.`);
        errors++;
        continue;
      }

      if (!fs.existsSync(resolvedPath)) {
         console.error(`❌ [Style Error] Link rotto in ${filePath}: "${linkPath}" non esiste.`);
         errors++;
      }
  }

  // 5. Warn on insecure http:// links
  const httpRegex = /\]\(http:\/\//g;
  if (httpRegex.test(textContent)) {
    console.warn(`⚠️ [Warning Security] ${filePath} contiene link http:// non sicuri. Usa https://.`);
  }

  // 6. Check for absolute paths (Portability check)
  const absPathRegex = /\]\((?:file:\/\/\/?|[a-zA-Z]:\\)[^)]+\)/g;
  if (absPathRegex.test(textContent)) {
    console.error(`❌ [Portability Error] ${filePath} contiene percorsi assoluti. Usa percorsi relativi.`);
    errors++;
  }

  // 7. Check for TODOs
  if (/\bTODO\b/.test(textContent)) {
    console.error(`❌ [Quality Error] ${filePath} contiene dei TODO non risolti.`);
    errors++;
  }

  // 8. Check for empty file
  if (textContent.trim().length === 0) {
    console.error(`❌ [Style Error] ${filePath} è vuoto.`);
    errors++;
  }

  // 7. Check kebab-case naming
  const fileName = path.basename(filePath, '.md');
  const isKebab = /^[a-z0-9]+(-[a-z0-9]+)*$/.test(fileName);
  if (!isKebab && !['README', 'GEMINI', 'base_agent', 'SKILL'].includes(fileName)) {
    console.warn(`⚠️ [Warning Naming] ${filePath}: il nome file "${fileName}" non è in kebab-case.`);
  }
}

function scanDirCheck(dir) {
  const fullPath = path.isAbsolute(dir) ? dir : path.join(ROOT_DIR, dir);
  if (!fs.existsSync(fullPath)) return;

  const items = fs.readdirSync(fullPath);
  for (const item of items) {
      const itemPath = path.join(fullPath, item);
      if (fs.statSync(itemPath).isDirectory()) {
          scanDirCheck(itemPath);
      } else if (item.endsWith('.md')) {
          validateFile(itemPath);
      }
  }
}

function checkTraceConsistency() {
  const traceDir = path.join(ROOT_DIR, 'logTrace');
  if (!fs.existsSync(traceDir)) return;

  const indexPath = path.join(traceDir, 'INDEX.md');
  if (!fs.existsSync(indexPath)) return;

  const indexContent = fs.readFileSync(indexPath, 'utf-8');
  const files = fs.readdirSync(traceDir);

  for (const file of files) {
    if (file === 'INDEX.md' || !file.endsWith('.md')) continue;
    if (!indexContent.includes(file)) {
      console.warn(`⚠️ [Warning Consistency] Trace log "${file}" non è registrato in INDEX.md.`);
    }
  }
}

function checkRootStructure() {
  const forbiddenDir = path.join(ROOT_DIR, 'agents');
  if (fs.existsSync(forbiddenDir)) {
    console.error(`❌ [Structure Error] La directory root "agents/" è deprecata. Sposta i workflow in ".agents/workflows/".`);
    errors++;
  }
}

console.log('🔍 Inizio validazione della libreria (Recursive + Quality Enforced)...');

DIRECTORIES_TO_CHECK.forEach(scanDirCheck);
validateFile(path.join(ROOT_DIR, 'README.md'));
validateFile(path.join(ROOT_DIR, 'GEMINI.md'));
checkTraceConsistency();
checkRootStructure();

if (errors > 0) {
    console.error(`\n❌ La validazione ha fallito con ${errors} errore/i. Corrections required.`);
    process.exit(1);
} else {
    console.log('\n✅ Validazione superata! Tutti i file Markdown rispettano i requisiti di qualità (100/100).');
}
