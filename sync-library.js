const fs = require('fs');
const path = require('path');

/**
 * Antigravity Library Sync Utility
 * 
 * Questo script permette di importare "plug-and-play" le regole, le skill e i workflow
 * di questa libreria in un altro progetto.
 */

const SOURCE_DIR = __dirname;
const TARGET_DIR = process.cwd();

// Cartelle e file da sincronizzare
const ASSETS_TO_SYNC = [
  'agents',
  'docs/rules',
  'skills',
  '.agent/workflows',
  'GEMINI.md'
];

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();

  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    // Evita di sovrascrivere file critici se già esistono (opzionale)
    fs.copyFileSync(src, dest);
  }
}

console.log(`🚀 Sincronizzazione Antigravity Library in corso...`);
console.log(`Source: ${SOURCE_DIR}`);
console.log(`Target: ${TARGET_DIR}\n`);

if (SOURCE_DIR === TARGET_DIR) {
  console.error('❌ Errore: La cartella sorgente e quella di destinazione sono le stesse.');
  process.exit(1);
}

ASSETS_TO_SYNC.forEach((asset) => {
  const srcPath = path.join(SOURCE_DIR, asset);
  const destPath = path.join(TARGET_DIR, asset);

  if (fs.existsSync(srcPath)) {
    console.log(`📦 Sincronizzazione: ${asset}...`);
    copyRecursiveSync(srcPath, destPath);
  } else {
    console.warn(`⚠️ Warning: Asset non trovato: ${asset}`);
  }
});

console.log('\n✅ Importazione completata con successo!');
console.log('Ora il tuo progetto è configurato con le regole e le skill di Antigravity.');
