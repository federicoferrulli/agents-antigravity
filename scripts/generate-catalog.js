const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const README_PATH = path.join(ROOT_DIR, 'README.md');

// Directory da scansionare col rispettivo titolo nel catagolo
const CATALOG_SECTIONS = [
  { dir: 'docs/rules', title: 'Regole e Standard (docs/rules)' },
  { dir: 'docs/adr', title: 'Decisioni Architetturali (docs/adr)' },
  { dir: 'skills', title: 'Competenze e Flussi (skills)' },
  { dir: 'agents', title: 'Personas (agents)' },
  { dir: '.agent/workflows', title: 'Workflows (.agent/workflows)' }
];

/**
 * Estrae i metadati dallo YAML Frontmatter
 */
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---/;
  const match = content.match(frontmatterRegex);
  if (!match) return null;

  const yaml = match[1];
  const metadata = {};
  yaml.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex !== -1) {
      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();
      // Rimuove virgolette se presenti
      value = value.replace(/^["'](.*)["']$/, '$1');
      metadata[key] = value;
    }
  });
  return metadata;
}

function getFileMetadata(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const metadata = parseFrontmatter(content);
  
  if (metadata) {
    return {
      title: metadata.title || path.basename(filePath),
      description: metadata.description || '',
      tags: metadata.tags || ''
    };
  }

  // Fallback se non c'è frontmatter
  let title = path.basename(filePath);
  const titleMatch = content.match(/^# (.*)/m);
  if (titleMatch) title = titleMatch[1].trim();

  return { title, description: '', tags: '' };
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
          const meta = getFileMetadata(filePath);
          let desc = meta.description;
          if (desc) { desc = ` - *${desc}*`; }
          
          // Link relativo basato sul README
          const relativeLink = `./${section.dir}/${file}`;
          catalogMd += `- [**${meta.title}**](${relativeLink})${desc}\n`;
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
