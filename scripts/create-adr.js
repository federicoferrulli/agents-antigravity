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

  const template = `---
title: "ADR-${nextNumber}: ${title}"
description: "Inserire descrizione sintetica qui."
tags: [adr, architecture, automation]
---

# ADR-${nextNumber}: ${title}

**Data**: ${new Date().toISOString().split('T')[0]}
**Status**: Proposed
**Deciders**: @architect, USER

> [!IMPORTANT]
> Inserire qui il principio chiave di questa decisione architetturale.

## Contesto
[Descrivi il problema e il contesto che ha portato a questa decisione.]

\`\`\`mermaid
graph TD
    A[Problema] --> B[Analisi]
    B --> C{Decisione}
\`\`\`

## Opzioni Considerate
1. **[Opzione A]**: Descrizione...
2. **[Opzione B]**: Descrizione...

## Decisione
Scegliamo **[Opzione X]** perché...

\`\`\`typescript
// Esempio di implementazione o pattern
const example = "Clean Architecture";
\`\`\`

## Conseguenze
### ✅ Positive
- ...

### ❌ Negative / Trade-off
- ...

## Esempi d'Uso
\`\`\`bash
# Esempio di comando o configurazione
npm run benchmark
\`\`\`

## Riferimenti
- [ADR-0001](./0001-adopting-adr.md)
`;

  fs.writeFileSync(filePath, template, 'utf-8');
  console.log(`✅ ADR creato con successo: ${path.relative(process.cwd(), filePath)}`);
}

createAdr();
