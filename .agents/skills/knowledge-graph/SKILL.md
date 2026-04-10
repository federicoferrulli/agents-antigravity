---
title: Knowledge Graph Skill (Graphify)
description: Skill per gestire e interrogare il Knowledge Graph del progetto utilizzando Graphify.
tags: [knowledge-graph, graphify, code-intelligence, agentic-workflow]
---

# Knowledge Graph Skill (Graphify)

Questo Skill integra **Graphify** nell'ecosistema Antigravity per fornire una comprensione strutturale del repository attraverso i Knowledge Graphs.

## 🚀 Panoramica
Graphify supera i limiti del Vector RAG tradizionale mappando le relazioni reali tra componenti del codice (AST), documentazione e diagrammi. Permette all'agente di navigare il codice come un grafo invece di una lista di frammenti di testo.

```mermaid
graph LR
    A[Agent] --> B[/graphify query]
    B --> C[(graph.json)]
    C --> D[Contextual Files]
    D --> E[Informed Action]
    subgraph "Knowledge Engine"
    C
    B
    end
```

## 🛠️ Setup e Manutenzione
L'ambiente è isolato in un Virtual Environment Python.

```bash
# Esecuzione del build obbligatorio (automatizzato da NPM)
npm run graph:build

# Interrogazione manuale del grafo
.venv\Scripts\graphify query "Qual è la dipendenza tra auth e repository?"
```

## 📂 Output e Artefatti
I risultati vengono salvati in `graphify-out/`:
- `graph.html`: Visualizzazione interattiva del grafo.
- `graph.json`: Database del grafo interrogabile dall'agente per BFS/DFS.
- `GRAPH_REPORT.md`: Audit report con "God Nodes", "Surprises" e suggerimenti.
- `cache/`: Cache semantica per velocizzare i build incrementali.

> [!TIP]
> Consulta sempre `GRAPH_REPORT.md` prima di iniziare un refactoring massivo per capire l'impatto dei cambiamenti sui nodi centrali. Il grafo ti permette di vedere "l'iceberg" sotto la superficie del codice.

## 🔎 Casi d'Uso Avanzati
1. **Analisi d'Impatto**: Prima di rinominare una funzione centrale, usa `/graphify query "Mostrami chi chiama la funzione X"` per vedere i potenziali breaking changes.
2. **Onboarding**: Se un nuovo sviluppatore (o agente) entra nel progetto, il grafo della community permette di capire i moduli logici in pochi secondi.
3. **Debugging**: Usa `/graphify query "Mostrami il path tra errore Y e input Z"` per navigare lo stack logico.

```bash
# Esempio di interrogazione per analisi d'impatto
.venv\Scripts\graphify query "Quali moduli dipendono da validate-library.js?"
```

## ⚡ Domain Extraction (Legacy projects)
In progetti legacy, il grafo è essenziale per estrarre la logica di business "sepolta" nel debito tecnico:
1. **Analisi Cluster**: Controlla le "Communities" nel report. File raggruppati insieme spesso condividono lo stesso Bounded Context, anche se sparsi in cartelle diverse.
2. **Pathfinding**: Usa `/graphify query` per trovare il percorso che un dato attraversa dal controller al database. Questo rivela le regole di business implicite.
3. **Surprise Analysis**: Link inaspettati tra moduli lontani indicano spesso hack o logiche di business "laterali" critiche.

## ## Checklist Operativa
- [ ] Il grafo è stato rigenerato dopo modifiche alle interfacce?
- [ ] Il comando `/graphify query` è stato usato per restringere il contesto prima di leggere file massivi?
- [ ] Le "Communities" nel report riflettono l'organizzazione logica del progetto?
- [ ] Il file `.venv` è presente e contiene `graphifyy`?
- [ ] La cartella `graphify-out/` è esclusa dal controllo di versione via `.gitignore`?

## ## Riferimenti
- [Antigravity Common Rules](../../rules/common/knowledge-graph.md)
- [Graphify CLI Reference](https://graphify.net/graphify-cli-commands.html)
- [Claude Code Integration](https://graphify.net/graphify-claude-code-integration.html)
- [Clean Architecture Skill](../refactoring-guide/SKILL.md)

---
*v1.1.0 - Antigravity Structural Awareness Skill (Master Edition)*
