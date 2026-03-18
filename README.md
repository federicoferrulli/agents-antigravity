# Antigravity Skills & Rules Library

Benvenuti nella libreria personale di skill, regole e agenti per **Antigravity**. 
Questo repository è progettato per centralizzare e standardizzare il comportamento degli agenti AI, garantendo coerenza, sicurezza e alta qualità nello sviluppo software.

## Struttura del Repository
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

👉 **[Leggi la Guida all'Uso Completa](./howtouse.md)** per imparare a integrare Antigravity nel tuo workflow quotidiano.


## Come Contribuire
Aggiungi nuove regole in `docs/rules/` o nuove competenze in `skills/` seguendo i template esistenti.


<!-- CATALOG_START -->
## Catalogo 

*Questo catalogo è generato automaticamente dallo script `scripts/generate-catalog.js`*

### Regole e Standard (docs/rules)
- [**Common Rules**](./docs/rules/common.md) - *Regole universali applicabili a ogni riga di codice generata.*
- [**Continuous Learning Rule**](./docs/rules/continuous-learning.md) - *Mandato per l'auto-miglioramento proattivo della libreria.*
- [**Database Rules**](./docs/rules/database.md) - *Standard per design schema, ORM e sicurezza dei dati.*
- [**Frontend Rules**](./docs/rules/frontend.md) - *Standard per UI/UX, accessibilità e testing frontend.*
- [**Python Rules**](./docs/rules/python.md) - *Standard per sviluppo Python moderno con focus su sicurezza e tipi.*
- [**Security Standards (OWASP)**](./docs/rules/security.md) - *Standard di sicurezza obbligatori basati su OWASP Top 10.*
- [**TypeScript Rules**](./docs/rules/typescript.md) - *Standard per TypeScript type-safe e professionale.*

### Decisioni Architetturali (docs/adr)
- [**ADR-0001: Adopting Architecture Decision Records**](./docs/adr/0001-adopting-adr.md)
- [**ADR-0002: Standardizing Metadata with YAML Frontmatter**](./docs/adr/0002-standard-metadata.md)

### Competenze e Flussi (skills)
- [**AI Prompting Skill**](./skills/ai-prompting.md) - *Pattern e framework per scrivere prompt agentici efficaci.*
- [**API Design Standards**](./skills/api-design.md) - *Standard per la creazione di API RESTful e documentazione OpenAPI.*
- [**API Versioning Skill**](./skills/api-versioning.md) - *Pattern per gestire il ciclo di vita e le breaking changes delle API.*
- [**Auth Patterns Skill**](./skills/auth-patterns.md) - *Pattern di implementazione per autenticazione JWT e autorizzazione RBAC.*
- [**Context Management Skill**](./skills/context-management.md) - *Guida alla Context Hygiene per mantenere l'AI precisa nelle lunghe sessioni.*
- [**Systematic Debugging Pro**](./skills/debugging-pro.md) - *Metodologia scientifica per la risoluzione rapida di bug complessi.*
- [**DevOps Pipeline Skill**](./skills/devops-pipeline.md) - *Standard per CI/CD, Docker e automazione del deployment.*
- [**Documentation Standards**](./skills/documentation-standards.md) - *Linee guida per documentazione tecnica chiara, scalabile e AI-friendly.*
- [**Error Monitoring Skill**](./skills/error-monitoring.md) - *Pattern per implementare observability completa: Sentry, OpenTelemetry e SLO.*
- [**Performance Optimization Skill**](./skills/performance-optimization.md) - *Pattern sistematici per identificare e risolvere colli di bottiglia.*
- [**Refactoring Guide**](./skills/refactoring-guide.md) - *Tecniche per migliorare la struttura del codice senza alterarne il comportamento.*
- [**TDD Workflow Skill**](./skills/tdd-workflow.md) - *Workflow Red-Green-Refactor per un design del codice guidato dai test.*
- [**Testing Strategy Skill**](./skills/testing-strategy.md) - *Strategia di test completa: piramide dei test, pattern e coverage goals.*

### Personas (agents)
- [**Architect Agent**](./agents/architect.md) - *Software Architect esperto in System Design, Clean Architecture e ADR.*
- [**Base Agent Persona**](./agents/base_agent.md) - *Persona base per lo sviluppo software senior con focus su Clean Architecture e DevSecOps.*
- [**Code Reviewer Agent**](./agents/code-reviewer.md) - *Senior Code Reviewer focalizzato su qualità del codice, pattern e feedback costruttivo.*
- [**Security Auditor Agent**](./agents/security-auditor.md) - *Security Engineer esperto in AppSec, OWASP e threat modeling.*

### Workflows (.agent/workflows)
- [**Execution Workflow**](./.agent/workflows/execution.md)
- [**Main Workflow Orchestrator**](./.agent/workflows/main-workflow.md)
- [**mass-refactor.md**](./.agent/workflows/mass-refactor.md) - *Attiva la modalità Esecuzione Massiva (DevOps) per applicare standard su più file*
- [**plan-skill.md**](./.agent/workflows/plan-skill.md) - *Avvia la modalità Pianificazione (Cole Medin) per creare una nuova Skill*
- [**planning.md**](./.agent/workflows/planning.md)
- [**primer.md**](./.agent/workflows/primer.md) - *Esegui un Primer (Metodo Cody) per ricaricare rapidamente il contesto critico in una chat pulita*
- [**Review Workflow**](./.agent/workflows/review.md)

<!-- CATALOG_END -->
