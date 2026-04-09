---
title: "ADR-0001: Adopting Architecture Decision Records"
description: "Decisione di utilizzare gli ADR per documentare le scelte architetturali del repository Antigravity."
status: Accepted
date: 2026-03-18
tags: [adr, documentation, architecture]
---

# ADR-0001: Adopting Architecture Decision Records

> [!IMPORTANT]
> Gli ADR sono la "storia vivente" dell'architettura del repository. Senza di essi, il debito tecnico cresce senza una spiegazione del perché sia nato.

## Contesto
La libreria Antigravity sta crescendo rapidamente in termini di regole, skill e agenti. Le decisioni tecniche (formati file, naming, standard di sicurezza) vengono prese iterativamente ma non sono documentate in modo centralizzato. Questo rende difficile per i nuovi utenti (o nuovi agenti) capire il *perché* di certe scelte.

```mermaid
graph TD
    A[Decisione Tecnica] --> B[Discussione Utente/Agente]
    B --> C{Decisione Presa?}
    C -- Sì --> D[Creazione ADR]
    D --> E[Versionamento in git]
    E --> F[Integrità Repository]
```

## Opzioni Considerate
1.  **Documentazione inline**: Commenti nei file o README estesi.
2.  **Wiki esterna**: Poco pratica per il versioning insieme al codice.
3.  **ADR (Architecture Decision Records)**: Record testuali archiviati nel repository.

## Decisione
Scegliamo **ADR** perché sono leggeri, versionati insieme al codice e facilmente scansionabili dagli agenti AI. Verranno salvati in `docs/adr/`.

### Esempio di Naming ADR
```bash
# Esempio di creazione file
# docs/adr/[ID]-[titolo-in-kebab-case].md
touch docs/adr/0001-adopting-adr.md
```

## Conseguenze
### ✅ Positive
- Tracciabilità delle decisioni nel tempo.
- Onboarding facilitato per l'agente `@architect`.
- Separazione tra *regole* (cosa fare) e *decisioni* (perché lo facciamo).

### ❌ Negative / Trade-off
- Overload di documentazione se usato per decisioni triviali.

## Visualizzazione Workflow
\`\`\`mermaid
graph LR
    A[New ADR] --> B[Proposed]
    B --> C[Review]
    C --> D[Accepted]
\`\`\`

## Esempio Struttura
\`\`\`markdown
# 0004: Template Feature
**Status**: Accepted
...
\`\`\`

## Struttura Suggerita
```markdown
# ID: Titolo
**Status**: [Proposed | Accepted | Deprecated]
## Contesto
## Decisione
## Conseguenze
```

## Checklist di Conformità ADR
- [ ] Il contesto del problema è chiaramente descritto?
- [ ] Tutte le opzioni considerate sono state elencate?
- [ ] La decisione finale è motivata tecnicamente?
- [ ] Le conseguenze (positive e negative) sono documentate?
- [ ] Sono stati aggiunti diagrammi Mermaid per visualizzare il processo?

## Riferimenti
- [ADR-0002: Standardizing Metadata](./0002-standard-metadata.md)
- [ADR-0003: Quality Enforcement](./0003-quality-enforced-documentation-as-code-structure.md)

---
*v1.2 - Architectural Governance*
