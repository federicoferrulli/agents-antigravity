#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * Antigravity Setup Utility
 * 
 * Automatizza la creazione dell'ambiente Python, l'installazione di Graphify
 * e la configurazione dei Git Hooks.
 */

const ROOT_DIR = path.resolve(__dirname, '..');
const isWin = process.platform === 'win32';

function run(command, cwd = ROOT_DIR) {
    try {
        console.log(`\n🏃 Executing: ${command}`);
        execSync(command, { cwd, stdio: 'inherit' });
        return true;
    } catch (err) {
        console.error(`❌ Error executing command: ${command}`);
        return false;
    }
}

console.log('🛡️  Antigravity Project Setup Starting...');

// 1. Verifica Python
let pythonCmd = 'python';
try {
    execSync('python --version', { stdio: 'ignore' });
} catch (e) {
    try {
        execSync('python3 --version', { stdio: 'ignore' });
        pythonCmd = 'python3';
    } catch (e2) {
        console.error('❌ Python non trovato. Installa Python 3.10+ per continuare.');
        process.exit(1);
    }
}

// 2. Creazione VENV
if (!fs.existsSync(path.join(ROOT_DIR, '.venv'))) {
    console.log('📦 Creazione Virtual Environment (.venv)...');
    run(`${pythonCmd} -m venv .venv`);
} else {
    console.log('✅ .venv già esistente.');
}

// 3. Installazione Graphify
const pipCmd = isWin ? path.join('.venv', 'Scripts', 'pip') : path.join('.venv', 'bin', 'pip');
console.log('📥 Installazione/Aggiornamento Graphify...');
run(`${pipCmd} install graphifyy`);

// 4. Integrazione specifica per l'agente (Gemini/Cursor)
const graphifyCmd = isWin ? path.join('.venv', 'Scripts', 'graphify') : path.join('.venv', 'bin', 'graphify');
console.log('🔗 Integrazione con l\'Agente AI...');
run(`${graphifyCmd} gemini install`);
if (fs.existsSync(path.join(ROOT_DIR, '.cursorrules'))) {
    run(`${graphifyCmd} cursor install`);
}

// 5. Cleanup
// In Consumer Mode, non forziamo Git Hooks o script di manutenzione.
// Questi sono riservati alla modalità Dev della libreria Antigravity.

console.log('\n✨ Setup completato con successo!');
console.log('Ora puoi usare "npm run graph:build" per generare il tuo knowledge graph (UTF-8 enabled).');
