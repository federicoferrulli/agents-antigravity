# Antigravity Skills & Rules Library

Benvenuti nella libreria personale di skill, regole e agenti per **Antigravity**. 
Questo repository è progettato per centralizzare e standardizzare il comportamento degli agenti AI, garantendo coerenza, sicurezza e alta qualità nello sviluppo software.

## Struttura del Repository
# Antigravity Skills & Rules Library

Benvenuti nella libreria personale di skill, regole e agenti per **Antigravity**. 
Questo repository è progettato per centralizzare e standardizzare il comportamento degli agenti AI, garantendo coerenza, sicurezza e alta qualità nello sviluppo software.

## Struttura del Repository

- **`agents/`**: Definizioni delle personas degli agenti (es. Architect, Code Reviewer).
- **`.agents/rules/`**: Regole e standard di codifica (es. comuni, specifiche per linguaggio come Python, TS).
- **`.agents/skills/`**: Moduli "How-To" per operazioni complesse (es. TDD, Ottimizzazione, Security Audit).
- **`.agents/workflows/`**: Sequenze operative e processi automatizzati.

## Filosofia
L'obiettivo è creare un ecosistema dove l'AI non è solo una chat, ma uno strumento specializzato guidato da regole ferree e competenze specifiche (skills).

👉 **[Leggi la Guida all'Uso Completa](./howtouse.md)** e le **[Istruzioni per l'Agente](./AGENT.md)** per imparare a integrare Antigravity nel tuo workflow quotidiano.


## Come Contribuire
Aggiungi nuove regole in `.agents/rules/` o nuove competenze in `.agents/skills/` seguendo i template esistenti.


<!-- CATALOG_START -->
## Catalogo 

*Questo catalogo è generato automaticamente dallo script `scripts/generate-catalog.js`*

### Regole e Standard (.agents/rules)
- [**common.md**](./.agents/rules/common.md) - *Regole universali applicabili a ogni riga di codice generata.*
- [**Continuous Learning Rule**](./.agents/rules/continuous-learning.md) - *Mandato per l'auto-miglioramento proattivo della libreria tramite Knowledge Harvesting.*
- [**Database Rules**](./.agents/rules/database.md) - *Standard per design schema, ORM e sicurezza dei dati.*
- [**Frontend Rules**](./.agents/rules/frontend.md) - *Standard per UI/UX, accessibilità e testing frontend.*
- [**Python Rules**](./.agents/rules/python.md) - *Standard per sviluppo Python moderno con focus su sicurezza e tipi.*
- [**Security Standards (OWASP)**](./.agents/rules/security.md) - *Standard di sicurezza obbligatori basati su OWASP Top 10.*
- [**TypeScript Rules**](./.agents/rules/typescript.md) - *Standard per TypeScript type-safe e professionale.*

### Decisioni Architetturali (docs/adr)
- [**ADR-0001: Adopting Architecture Decision Records**](./docs/adr/0001-adopting-adr.md)
- [**ADR-0002: Standardizing Metadata with YAML Frontmatter**](./docs/adr/0002-standard-metadata.md)

### Competenze e Flussi (.agents/skills)
- [**SKILL.md**](./.agents/skills/ai-prompting/SKILL.md) - *Pattern e framework per scrivere prompt agentici efficaci.*
- [**SKILL.md**](./.agents/skills/api-design/SKILL.md) - *Standard per la creazione di API RESTful e documentazione OpenAPI.*
- [**SKILL.md**](./.agents/skills/api-versioning/SKILL.md) - *Pattern per gestire il ciclo di vita e le breaking changes delle API.*
- [**SKILL.md**](./.agents/skills/auth-patterns/SKILL.md) - *Pattern di implementazione per autenticazione JWT e autorizzazione RBAC.*
- [**SKILL.md**](./.agents/skills/context-management/SKILL.md) - *Guida alla Context Hygiene per mantenere l'AI precisa nelle lunghe sessioni.*
- [**SKILL.md**](./.agents/skills/debugging-pro/SKILL.md) - *Metodologia scientifica per la risoluzione rapida di bug complessi.*
- [**SKILL.md**](./.agents/skills/devops-pipeline/SKILL.md) - *Standard per CI/CD, Docker e automazione del deployment.*
- [**SKILL.md**](./.agents/skills/documentation-standards/SKILL.md) - *Linee guida per documentazione tecnica chiara, scalabile e AI-friendly.*
- [**SKILL.md**](./.agents/skills/error-monitoring/SKILL.md) - *Pattern per implementare observability completa: Sentry, OpenTelemetry e SLO.*
- [**SKILL.md**](./.agents/skills/performance-optimization/SKILL.md) - *Pattern sistematici per identificare e risolvere colli di bottiglia.*
- [**SKILL.md**](./.agents/skills/refactoring-guide/SKILL.md) - *Tecniche per migliorare la struttura del codice senza alterarne il comportamento.*
- [**SKILL.md**](./.agents/skills/tdd-workflow/SKILL.md) - *Workflow Red-Green-Refactor per un design del codice guidato dai test.*
- [**SKILL.md**](./.agents/skills/testing-strategy/SKILL.md) - *Strategia di test completa: piramide dei test, pattern e coverage goals.*

### Workflows (.agents/workflows)
- [**Software Architect Workflow**](./.agents/workflows/architect.md) - *Software Architect esperto in System Design, Clean Architecture e ADR.*
- [**AutoResearch Workflow**](./.agents/workflows/auto-research.md) - *Un framework per l'ottimizzazione autonoma e iterativa di componenti logiche tramite loop di feedback misurabili.*
- [**Base Agent Persona**](./.agents/workflows/base_agent.md) - *Persona base per lo sviluppo software senior con focus su Clean Architecture e DevSecOps.*
- [**CodeReviewer Workflow**](./.agents/workflows/code-reviewer.md) - *Senior Code Reviewer focalizzato su qualità del codice, pattern e feedback costruttivo.*
- [**Execution Workflow**](./.agents/workflows/execution.md) - *Protocollo operativo per l'implementazione del codice, basato su cicli iterativi di TDD e principi di Clean Architecture.*
- [**ImproveMd Workflow**](./.agents/workflows/improve-md.md) - *Migliora la qualità della documentazione MD tramite Auto-Research e Git tagging.*
- [**Main Workflow Orchestrator**](./.agents/workflows/main-workflow.md) - *Il punto di ingresso e l'orchestrazione principale per tutti i task di sviluppo nell'ecosistema Antigravity.*
- [**MassRefactor Workflow**](./.agents/workflows/mass-refactor.md) - *Attiva la modalità Esecuzione Massiva (DevOps) per applicare standard su più file contemporaneamente.*
- [**PlanSkill Workflow**](./.agents/workflows/plan-skill.md) - *Protocollo per la progettazione e la creazione di nuove Skill agentiche in Antigravity.*
- [**Planning Workflow**](./.agents/workflows/planning.md) - *Protocollo dettagliato per l'analisi dei requisiti, l'esplorazione tecnica e la strutturazione del piano d'azione.*
- [**Primer Workflow**](./.agents/workflows/primer.md) - *Esegui un Primer (Metodo Cody) per ricaricare rapidamente il contesto critico in una chat pulita.*
- [**Review Workflow**](./.agents/workflows/review.md) - *Protocollo finale per l'audit di qualità, sicurezza e validazione funzionale prima della consegna.*
- [**Security Auditor Agent**](./.agents/workflows/security-auditor.md) - *Security Engineer esperto in AppSec, OWASP e threat modeling.*
- [**Trace Synchronization Workflow**](./.agents/workflows/sync-trace.md) - *Sincronizza lo stato dell'agente leggendo l'indice e i log di traccia in logTrace/.*

<!-- CATALOG_END -->
