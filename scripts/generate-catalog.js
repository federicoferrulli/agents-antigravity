const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const README_PATH = path.join(ROOT_DIR, 'README.md');

// Directory da scansionare col rispettivo titolo nel catagolo
const CATALOG_SECTIONS = [
  { dir: 'docs/rules', title: 'Regole e Standard (docs/rules)' },
  { dir: 'skills', title: 'Competenze e Flussi (skills)' },
  { dir: 'agents', title: 'Personas (agents)' },
  { dir: '.agent/workflows', title: 'Workflows (.agent/workflows)' }
];

/**
 * Legge la prima riga utile del file Markdown per usarla come titolo (H1)
 * Se non la trova, usa il nome del file.
 */
function extractTitleFromMarkdown(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  for (const line of lines) {
    if (line.startsWith('# ')) {
      return line.replace('# ', '').trim();
    }
  }
  return path.basename(filePath); // Fallback
}

/**
 * Cerca di estrarre una piccola descrizione o il primo paragrafo testuale utile (non header, non lista)
 */
function extractDescriptionFromMarkdown(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    let titleFound = false;
    
    for (const line of lines) {
        if (line.startsWith('# ')) {
            titleFound = true;
            continue;
        }
        
        const trimmed = line.trim();
        // Cerca il primo paragrafo non vuoto e non speciale dopo il titolo
        if (titleFound && trimmed.length > 0 && !trimmed.startsWith('#') && !trimmed.startsWith('-') && !trimmed.startsWith('>') && !trimmed.startsWith('1.')) {
            return trimmed.length > 100 ? trimmed.substring(0, 100) + '...' : trimmed;
        }
    }
    return '';
}

function generateCatalogMarkdown() {
  let catalogMd = `<!-- CATALOG_START -->\n## Catalogo \n\n*Questo catalogo è generato automaticamente dallo script \`scripts/generate-catalog.js\`*\n\n`;

  CATALOG_SECTIONS.forEach(section => {
    const fullDirPath = path.join(ROOT_DIR, section.dir);
    if (!fs.existsSync(fullDirPath)) return;

    catalogMd += `### ${section.title}\n`;
    
    const files = fs.readdirSync(fullDirPath).filter(file => file.endsWith('.md'));
    
    if (files.length === 0) {
        catalogMd += `- *(Nessun file presente)*\n`;
    } else {
        files.forEach(file => {
          const filePath = path.join(fullDirPath, file);
          const title = extractTitleFromMarkdown(filePath);
          let desc = extractDescriptionFromMarkdown(filePath);
          if (desc) { desc = ` - *${desc}*`; }
          
          // Link relativo basato sul README
          const relativeLink = `./${section.dir}/${file}`;
          catalogMd += `- [**${title}**](${relativeLink})${desc}\n`;
        });
    }
    catalogMd += '\n';
  });

  catalogMd += `<!-- CATALOG_END -->`;
  return catalogMd;
}

function updateReadme(newCatalogContent) {
  if (!fs.existsSync(README_PATH)) {
    console.error('❌ Erorre: README.md non trovato nella root.');
    process.exit(1);
  }

  const currentReadme = fs.readFileSync(README_PATH, 'utf-8');
  const catalogRegex = /<!-- CATALOG_START -->[\s\S]*<!-- CATALOG_END -->/;

  let updatedReadme;
  if (catalogRegex.test(currentReadme)) {
    // Replace existing catalog
    updatedReadme = currentReadme.replace(catalogRegex, newCatalogContent);
    console.log('🔄 Catalogo esistente aggiornato nel README.md');
  } else {
    // Append at the end if no markers found
    updatedReadme = currentReadme + '\n\n' + newCatalogContent + '\n';
    console.log('➕ Nuovo catalogo aggiunto alla fine del README.md');
  }

  fs.writeFileSync(README_PATH, updatedReadme, 'utf-8');
  console.log('✅ Generazione del catalogo completata con successo!');
}

console.log('🚀 Inizio scansione della libreria per il catalogo...');
const catalogMd = generateCatalogMarkdown();
updateReadme(catalogMd);
