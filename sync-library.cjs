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
  .name('antigravity-onboarding')
  .description('Innestà il "Cervello" Antigravity in un progetto (legacy o nuovo)')
  .version('1.2.0')
  .option('-d, --dry-run', 'Visualizza le modifiche senza applicarle')
  .option('-f, --force', 'Sovrascrive i file esistenti senza creare backup')
  .option('-t, --target <path>', 'Specifica una directory di destinazione diversa da quella corrente', process.cwd())
  .option('-s, --setup', 'Esegue il setup automatico dell\'ambiente (venv, graphify)')
  .option('--dev', 'Include gli script di manutenzione della libreria (catalog, validate)')
  .parse(process.argv);

const options = program.opts();
const isDryRun = options.dryRun;
const isForce = options.force;
const TARGET_DIR = path.resolve(options.target);
const SOURCE_DIR = __dirname;

// Cartelle e file da sincronizzare per un'esperienza "360"
const ASSETS_TO_SYNC = [
  '.agents',
  'scripts',
  '.cursorrules',
  '.clinerules',
  'GEMINI.md',
  'CLAUDE.md'
];

/**
 * Verifica se il package.json del target ha gli script necessari
 * e li inieta automaticamente o suggerisce le aggiunte.
 */
function checkPackageJson(targetDir) {
  const pkgPath = path.join(targetDir, 'package.json');
  if (!fs.existsSync(pkgPath)) {
    console.log('\nℹ️ [Notice] Nessun package.json trovato nella directory di destinazione.');
    return;
  }

  try {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    const missingScripts = [];
    
    // Rilevamento OS per comandi cross-platform
    const isWin = process.platform === 'win32';
    const venvPath = isWin ? '.venv\\Scripts' : '.venv/bin';
    const pythonExe = isWin ? 'python' : 'python3';
    
    const recommendedScripts = {
      "graph:build": `${venvPath}${isWin ? '\\' : '/'}${pythonExe} -X utf8 -c "from graphify.watch import _rebuild_code; from pathlib import Path; _rebuild_code(Path('.'))"`,
      "graph:query": `${venvPath}${isWin ? '\\' : '/'}${isWin ? 'graphify' : 'graphify'} query`
    };

    // Aggiungi script di manutenzione solo se richiesto (es. se si sta contribuendo alla libreria)
    if (options.dev) {
      recommendedScripts["catalog"] = "node scripts/generate-catalog.cjs";
      recommendedScripts["validate"] = "node scripts/validate-library.cjs";
    }

    if (!pkg.scripts) pkg.scripts = {};

    Object.keys(recommendedScripts).forEach(s => {
      if (!pkg.scripts[s]) {
        missingScripts.push({ name: s, command: recommendedScripts[s] });
      }
    });

    if (missingScripts.length > 0) {
      console.log(`\n💡 [Recommendation] Trovati ${missingScripts.length} script mancanti.`);
      
      if (!isDryRun) {
        missingScripts.forEach(s => {
          pkg.scripts[s.name] = s.command;
        });
        fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2), 'utf8');
        console.log('✅ [Updated] package.json aggiornato con successo.');
      } else {
        console.log('Aggiungi manualmente al package.json:');
        console.log(JSON.stringify({ scripts: recommendedScripts }, null, 2));
      }
    }
  } catch (err) {
    console.warn(`\n⚠️ Warning: Impossibile analizzare package.json: ${err.message}`);
  }
}

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

/**
 * Prepara la struttura di cartelle obbligatorie per i tool (es. ADR)
 */
function scaffoldTarget(targetDir) {
  const adrPath = path.join(targetDir, 'docs', 'adr');
  if (!fs.existsSync(adrPath)) {
    if (!isDryRun) {
      fs.mkdirSync(adrPath, { recursive: true });
      fs.writeFileSync(path.join(adrPath, '.keep'), '');
    }
    console.log(`🏗️ [Scaffold] Creata directory docs/adr/`);
  }
  
  const gitPath = path.join(targetDir, '.git');
  if (fs.existsSync(gitPath)) {
    console.log('💡 Git Hooks non configurati automaticamente (Consumer Mode).');
  } else {
    console.log('⚠️  Directory .git non trovata. Skip hook setup.');
  }
}

console.log(`🚀 Sincronizzazione Antigravity Library v1.1.0 in corso...`);
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

// Scaffold cartelle mancanti
scaffoldTarget(TARGET_DIR);

// Verifica package.json per gli script
checkPackageJson(TARGET_DIR);

console.log('\n✅ Importazione completata con successo!');
if (options.setup && !isDryRun) {
  console.log('\n🧠 [Brain Transplant] Innesco del sistema di intelligenza...');
  const { execSync } = require('child_process');
  try {
    execSync('node scripts/setup-project.cjs', { cwd: TARGET_DIR, stdio: 'inherit' });
    console.log('\n🔍 [Scanning Context] Analisi strutturale del progetto esistente...');
    execSync('npm run graph:build', { cwd: TARGET_DIR, stdio: 'inherit' });
    console.log('\n📊 [READY] Il progetto è stato mappato. Consulta graphify-out/GRAPH_REPORT.md per i dettagli.');
  } catch (err) {
    console.error('❌ Errore durante l\'onboarding automatico.');
  }
} else if (!isDryRun) {
  console.log('\n✅ Innesto Antigravity completato.');
  console.log('💡 [Prossimi Passi per Legacy Code]:');
  console.log('1. Esegui: node scripts/setup-project.cjs (Configura venv e Graphify)');
  console.log('2. Esegui: npm run graph:build (Mappa istantaneamente tutto il progetto)');
  console.log('3. Usa il workflow: /onboarding (Per estrarre logica di business)');
}
