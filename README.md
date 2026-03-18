# Antigravity Skills & Rules Library

Benvenuti nella libreria personale di skill, regole e agenti per **Antigravity**. 
Questo repository è progettato per centralizzare e standardizzare il comportamento degli agenti AI, garantendo coerenza, sicurezza e alta qualità nello sviluppo software.

## Struttura del Repository

- **`agents/`**: Definizioni delle personas degli agenti (es. Architect, Code Reviewer).
- **`docs/rules/`**: Regole e standard di codifica (es. comuni, specifiche per linguaggio come Python, TS).
- **`skills/`**: Moduli "How-To" per operazioni complesse (es. TDD, Ottimizzazione, Security Audit).
- **`.agent/workflows/`**: Sequenze operative e processi automatizzati.

## Filosofia
L'obiettivo è creare un ecosistema dove l'AI non è solo una chat, ma uno strumento specializzato guidato da regole ferree e competenze specifiche (skills).

## Come Contribuire
Aggiungi nuove regole in `docs/rules/` o nuove competenze in `skills/` seguendo i template esistenti.


<!-- CATALOG_START -->
## Catalogo 

*Questo catalogo è generato automaticamente dallo script `scripts/generate-catalog.js`*

### Regole e Standard (docs/rules)
- [**Common Rules**](./docs/rules/common.md) - *Queste regole si applicano a **tutto il codice generato**, indipendentemente dal linguaggio o framew...*
- [**Continuous Learning Rule (Knowledge Harvesting)**](./docs/rules/continuous-learning.md) - *Questa regola definisce come l'agente (tu) deve comportarsi come un manutentore attivo di questa ste...*
- [**Database Rules**](./docs/rules/database.md) - *Queste regole si applicano a **ogni interazione con un database**, SQL o NoSQL. L'obiettivo è garant...*
- [**Frontend Rules**](./docs/rules/frontend.md) - *Queste regole si applicano allo sviluppo di **qualsiasi interfaccia utente** (Web, Mobile, Desktop)....*
- [**Python Rules**](./docs/rules/python.md) - *Queste regole si applicano a **ogni file Python generato o modificato**. L'obiettivo è codice leggib...*
- [**Security Standards (OWASP)**](./docs/rules/security.md) - *Queste regole si applicano a **tutto il codice generato** per garantire sicurezza by design. Non son...*
- [**TypeScript Rules**](./docs/rules/typescript.md) - *Queste regole si applicano a **ogni file TypeScript prodotto o modificato**. L'obiettivo è type-safe...*

### Competenze e Flussi (skills)
- [**AI Prompting Skill**](./skills/ai-prompting.md) - *Questa skill definisce come scrivere **prompt efficaci** per agenti AI (Gemini, GPT, Claude) all'int...*
- [**API Design Standards**](./skills/api-design.md) - *Queste istruzioni si applicano ogni volta che generi router, controller o specchi OpenAPI.*
- [**API Versioning Skill**](./skills/api-versioning.md) - *Questa skill definisce i pattern per gestire il **versionamento delle API** in modo da evolvere il c...*
- [**Auth Patterns Skill**](./skills/auth-patterns.md) - *Questa skill definisce i pattern canonici per implementare **Autenticazione e Autorizzazione** sicur...*
- [**Context Management Skill (Context Hygiene)**](./skills/context-management.md) - *Questa skill definisce come gestire e pulire il contesto della chat per mantenere l'AI (Antigravity)...*
- [**Systematic Debugging Pro**](./skills/debugging-pro.md) - *Il debugging non consiste nel tirare a indovinare. È un processo scientifico di osservazione, formul...*
- [**DevOps Pipeline Skill**](./skills/devops-pipeline.md) - *Questa skill definisce i pattern per configurare **CI/CD, containerizzazione e monitoring** di un'ap...*
- [**Documentation Standards**](./skills/documentation-standards.md) - *Aderisci sempre agli standard di documentazione per assicurare che altri agenti, bot LLM o ingegneri...*
- [**Error Monitoring Skill**](./skills/error-monitoring.md) - *Questa skill definisce i pattern per implementare **observability** completa: error tracking, tracin...*
- [**Performance Optimization Skill**](./skills/performance-optimization.md) - *Questa skill definisce i pattern sistematici per identificare e risolvere i problemi di performance....*
- [**Refactoring Guide**](./skills/refactoring-guide.md) - *Il Refactoring è il processo di miglioramento della struttura interna del codice senza alterarne il ...*
- [**TDD Workflow Skill**](./skills/tdd-workflow.md) - *Il Test-Driven Development (TDD) serve non solo a prevenire i bug, ma soprattutto a **disegnare** le...*
- [**Testing Strategy Skill**](./skills/testing-strategy.md) - *Questa skill definisce una strategia di test completa e pratica per applicazioni moderne. Applicala ...*

### Personas (agents)
- [**Architect Agent**](./agents/architect.md) - *Sei un **Software Architect** con specializzazione in System Design, Clean Architecture e decisioni ...*
- [**Base Agent Persona**](./agents/base_agent.md) - *Sei un **Ingegnere del Software Senior con oltre 10 anni di esperienza** in Clean Architecture, Syst...*
- [**Code Reviewer Agent**](./agents/code-reviewer.md) - *Sei un **Senior Code Reviewer** con 10+ anni di esperienza in code quality, refactoring e design pat...*
- [**Security Auditor Agent**](./agents/security-auditor.md) - *Sei un **Security Engineer** specializzato in Application Security (AppSec) con mindset da penetrati...*

### Workflows (.agent/workflows)
- [**Execution Workflow**](./.agent/workflows/execution.md) - *Una volta che il piano è stato approvato (`[Planning](./planning.md)` completato), l'agente deve pro...*
- [**Main Workflow Orchestrator**](./.agent/workflows/main-workflow.md) - *Questo file definisce il flusso di lavoro principale per gli agenti all'interno del workspace Antigr...*
- [**Massive Refactor Workflow**](./.agent/workflows/mass-refactor.md) - *Attiva la modalità Esecuzione Massiva. Ti indicherò una root folder (es. `agents/`) e uno standard d...*
- [**Plan Skill Workflow**](./.agent/workflows/plan-skill.md) - *Avvia la modalità Pianificazione (Cole Medin). Ti fornirò un'idea generale per una nuova 'Skill' per...*
- [**Planning Workflow**](./.agent/workflows/planning.md) - *La fase di pianificazione è cruciale per garantire che il codice sviluppato risponda esattamente ai ...*
- [**Primer Workflow**](./.agent/workflows/primer.md) - *Esegui un Primer. Leggi immediatamente il `README.md` (tutto il catalogo), il `GEMINI.md` e il `docs...*
- [**Review Workflow**](./.agent/workflows/review.md) - *Una volta che gli step di esecuzione (`[Execution](./execution.md)`) sono completati, entra in gioco...*

<!-- CATALOG_END -->
