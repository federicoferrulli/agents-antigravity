# AGENT.md - Master Instructions for Antigravity AI Agents

Questo file definisce le istruzioni fondamentali e il contesto operativo per tutti gli agenti AI (Gemini, Cursor, Cline, Copilot, etc.) che interagiscono con questo repository.

## Panoramica del Progetto
Questa è la **Skill & Rule Library** di Antigravity. Il suo scopo è ospitare e organizzare:
1. **Regole (`.agents/rules/`)**: Standard di codifica, architettura (Clean Architecture) e sicurezza (OWASP).
2. **Skill (`.agents/skills/`)**: Flussi di lavoro specialistici e conoscenze approfondite.
3. **Agenti (`agents/`)**: Definizioni di persona con focus specifici.

## Mandati Obbligatori per l'Agente
In ogni interazione all'interno di questo workspace, devi:

### 1. Rispetto delle Regole
- Caricare e applicare **SEMPRE** le regole contenute in `.agents/rules/common.md` prima di qualsiasi azione di codifica.
- Se il progetto su cui lavori usa un linguaggio specifico (es. Python, TS), verifica se esistono regole corrispondenti in `.agents/rules/` e applicale.

### 2. Utilizzo delle Skill
- Quando ti viene chiesto di eseguire compiti complessi (es. TDD, Security Audit), verifica se esiste una skill corrispondente in `.agents/skills/` e seguine le istruzioni "How-To".

### 3. Identità dell'Agente
- Comportati secondo le definizioni presenti in `agents/`. Se non diversamente specificato, usa il `base_agent.md` come riferimento per la tua persona.

### 4. Gestione del Repository
- Quando crei nuove regole o skill, assicurati che siano ben documentate in Markdown con YAML frontmatter (come da ADR-0002) e seguano la struttura gerarchica esistente.
- Il file `README.md` è la fonte principale per il catalogo delle risorse.

### 5. Continuous Learning (Knowledge Harvesting)
- Aderisci a `.agents/rules/continuous-learning.md`. Sii proattivo: quando risolvi un problema inedito o crei un workflow utile, chiedi all'utente di documentarlo immediatamente come regola o skill.

## Convenzioni di Sviluppo
- **Architettura**: Prediligi sempre la **CLEAN ARCHITECTURE**.
- **Documentazione**: Ogni nuova regola o skill deve includere esempi pratici e casi d'uso.
- **Sicurezza**: Ogni suggerimento di codice deve essere "Secure by Design" (OWASP).

## Antigravity Workflow Triggers & Golden Rules
1. **"Secure by Design" Implicito**: Ogni proposta tecnica deve includere nativamente una componente di sicurezza.
2. **Aggiornamento Catalogo Automatico**: Quando crei o elimini file, aggiorna il Catalogo nel `README.md`.
3. **Chiusura Task**: Quando l'utente chiude il task, esegui un check finale di conformità alle regole e riassumi brevemente.

## Workflow Iterativo
1. **Ricerca**: Consulta `.agents/rules/` e `.agents/skills/` per le linee guida rilevanti.
2. **Pianificazione**: Dichiara quale regola/skill stai applicando.
3. **Esecuzione**: Implementa seguendo i pattern della libreria.
4. **Validazione**: Verifica che il risultato sia conforme agli standard.
