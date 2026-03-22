#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { Command } = require('commander');

/**
 * Antigravity Library Sync Utility
 * 
 * Questo script permette di importare "plug-and-play" le regole, le skill e i workflow
 * di questa libreria in un altro progetto.
 */

const program = new Command();

// Configurazione CLI
program
  .name('antigravity-sync')
  .description('Sincronizza le regole e le skill di Antigravity nel progetto corrente')
  .version('1.0.0')
  .option('-d, --dry-run', 'Visualizza le modifiche senza applicarle')
  .option('-f, --force', 'Sovrascrive i file esistenti senza creare backup')
  .option('-t, --target <path>', 'Specifica una directory di destinazione diversa da quella corrente', process.cwd())
  .parse(process.argv);

const options = program.opts();
const isDryRun = options.dryRun;
const isForce = options.force;
const TARGET_DIR = path.resolve(options.target);
const SOURCE_DIR = __dirname;

// Cartelle e file da sincronizzare
const ASSETS_TO_SYNC = [
  'agents',
  'docs/rules',
  'skills',
  '.agent/workflows',
  'GEMINI.md',
  'CLAUDE.md'
];

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();

  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      if (!isDryRun) {
        fs.mkdirSync(dest, { recursive: true });
      }
      console.log(`📁 [Created Directory] ${dest}`);
    }
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    // Gestione dei file
    const destExists = fs.existsSync(dest);
    
    if (destExists) {
        if (!isForce) {
            const backupPath = `${dest}.bak`;
            if (!isDryRun) {
                fs.copyFileSync(dest, backupPath);
            }
            console.log(`💾 [Backup Created] ${backupPath}`);
        } else {
            console.log(`⚠️ [Force Overwrite] ${dest}`);
        }
    }

    if (!isDryRun) {
      fs.copyFileSync(src, dest);
    }
    console.log(`📄 [Copied File] ${destExists ? '-> Overwritten ' : '-> Created '}${dest}`);
  }
}

console.log(`🚀 Sincronizzazione Antigravity Library in corso...`);
if (isDryRun) console.log(`🔍 [DRY RUN MODE] Nessun file verrà modificato.`);
if (isForce) console.log(`⚠️ [FORCE MODE] I backup non verranno creati.`);

console.log(`Source: ${SOURCE_DIR}`);
console.log(`Target: ${TARGET_DIR}\n`);

// Verifica che sorgente e destinazione non siano la stessa cartella
if (path.resolve(SOURCE_DIR) === path.resolve(TARGET_DIR)) {
  console.error('❌ Errore: La cartella sorgente e quella di destinazione sono le stesse.');
  process.exit(1);
}

ASSETS_TO_SYNC.forEach((asset) => {
  const srcPath = path.join(SOURCE_DIR, asset);
  const destPath = path.join(TARGET_DIR, asset);

  if (fs.existsSync(srcPath)) {
    console.log(`\n📦 Sincronizzazione: ${asset}...`);
    copyRecursiveSync(srcPath, destPath);
  } else {
    console.warn(`⚠️ Warning: Asset non trovato: ${asset}`);
  }
});

console.log('\n✅ Importazione completata con successo!');
if (!isDryRun) {
    console.log('Ora il tuo progetto è configurato con le regole e le skill di Antigravity.');
}
