const fs = require('fs');
const path = require('path');

const ADR_DIR = path.join(__dirname, '..', 'docs', 'adr');

function createAdr() {
  const title = process.argv[2];
  if (!title) {
    console.error('❌ Errore: Specifica un titolo per l\'ADR. Esempio: npm run adr "Uso di Vite"');
    process.exit(1);
  }

  if (!fs.existsSync(ADR_DIR)) {
    fs.mkdirSync(ADR_DIR, { recursive: true });
  }

  const existingAdrs = fs.readdirSync(ADR_DIR).filter(f => f.endsWith('.md'));
  const nextNumber = (existingAdrs.length + 1).toString().padStart(4, '0');
  const fileName = `${nextNumber}-${title.toLowerCase().replace(/\s+/g, '-')}.md`;
  const filePath = path.join(ADR_DIR, fileName);

  const template = `# ADR-${nextNumber}: ${title}

**Data**: ${new Date().toISOString().split('T')[0]}
**Status**: Proposed
**Deciders**: @architect, USER

## Contesto
[Descrivi il problema e il contesto...]

## Opzioni Considerate
1. **[Opzione A]**
2. **[Opzione B]**

## Decisione
Scegliamo **[Opzione X]** perché...

## Conseguenze
### ✅ Positive
- ...

### ❌ Negative / Trade-off
- ...

## Riferimenti
- ...
`;

  fs.writeFileSync(filePath, template, 'utf-8');
  console.log(`✅ ADR creato con successo: ${path.relative(process.cwd(), filePath)}`);
}

createAdr();
