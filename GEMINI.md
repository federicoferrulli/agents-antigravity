# GEMINI.md - Istruzioni per Antigravity Skills Library

Questo file definisce le istruzioni fondamentali e il contesto per tutte le interazioni Gemini CLI all'interno di questo repository.

## Panoramica del Progetto
Questa è la tua **Skill & Rule Library** per Antigravity. Il suo scopo è ospitare e organizzare:
1. **Regole (`docs/rules/`)**: Standard di codifica, architettura (Clean Architecture) e sicurezza (OWASP).
2. **Skill (`skills/`)**: Flussi di lavoro specialistici e conoscenze approfondite.
3. **Agenti (`agents/`)**: Definizioni di persona con focus specifici.

## Mandati per Gemini CLI
In ogni interazione all'interno di questo workspace, devi:

### 1. Rispetto delle Regole
- Caricare e applicare **SEMPRE** le regole contenute in `docs/rules/common.md` prima di qualsiasi azione di codifica.
- Se il progetto su cui lavori usa un linguaggio specifico (es. Python, TS), verifica se esistono regole corrispondenti in `docs/rules/` e applicale.

### 2. Utilizzo delle Skill
- Quando ti viene chiesto di eseguire compiti complessi (es. TDD, Security Audit), verifica se esiste una skill corrispondente in `skills/` e seguine le istruzioni "How-To".

### 3. Identità dell'Agente
- Comportati secondo le definizioni presenti in `agents/`. Se non diversamente specificato, usa il `base_agent.md`.

### 4. Gestione del Repository
- Quando crei nuove regole o skill, assicurati che siano ben documentate in Markdown e seguano la struttura gerarchica esistente.
- Il file `README.md` è la fonte principale per la struttura del repository.

### 5. Continuous Learning (Knowledge Harvesting)
- Aderisci a `docs/rules/continuous-learning.md`. Sii proattivo nel mantenere viva questa libreria. Quando risolvi un problema inedito o crei un workflow utile, chiedi all'utente di documentarlo immediatamente come regola o skill.

## Convenzioni di Sviluppo
- **Architettura**: Prediligi sempre la **CLEAN ARCHITECTURE**.
- **Documentazione**: Ogni nuova regola o skill deve includere esempi pratici e casi d'uso.
- **Sicurezza**: Ogni suggerimento di codice deve essere "Secure by Design".

## Workflow Iterativo
1. **Ricerca**: Cerca in `docs/rules/` e `skills/` le linee guida rilevanti.
2. **Pianificazione**: Spiega quale regola/skill stai applicando.
3. **Esecuzione**: Implementa seguendo i pattern della libreria.
4. **Validazione**: Verifica che il risultato sia conforme agli standard della libreria.
