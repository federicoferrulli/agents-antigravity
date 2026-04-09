---
title: "Guida all'Uso"
description: "Workflow completo per utilizzare la libreria Antigravity nello sviluppo quotidiano."
category: "General"
tags: ["guida", "workflow", "tutorial", "best-practices"]
---

# Guida all'Uso di Antigravity

Questa guida illustra il workflow ideale per massimizzare l'efficacia degli agenti AI utilizzando questa libreria di regole e skill.

```mermaid
graph TD
    A[Start Session] --> B[/primer: Context Loading]
    B --> C[Planning: Action Plan]
    C --> D[Execution: Coding with Skills]
    D --> E[Review: Audit & Validation]
    E --> F[Knowledge Harvesting: Log & Learn]
    F --> A
```

---

## 🚀 1. Inizio Sessione: Il "Primer"

All'apertura di una nuova chat, la prima cosa da fare è caricare le regole base per allineare l'AI agli standard del progetto.

**Comando**: `/primer` (o esegui il workflow `.agent/workflows/primer.md`)

Questo comando istruisce l'AI a leggere:
- `README.md` (Catalogo delle competenze)
- `AGENT.md` (Mandati universali e Golden Rules)
- `.agents/rules/common.md` (Clean Architecture e Standards)

> [!NOTE]
> Se usi **Cursor** o **Cline**, questa inizializzazione avviene spesso automaticamente grazie ai file `.cursorrules` e `.clinerules` presenti nel root.

---

## 🧠 2. Flusso di Lavoro Quotidiano

Segui sempre il ciclo **Planning → Execution → Review**.

### Fase A: Planning (Pianificazione)
Inizia descrivendo il problema. L'AI creerà un piano d'azione.
> **User**: "Devo aggiungere un sistema di notifiche push al backend."
> **AI (@architect)**: Genera un `implementation_plan.md` basandosi su `.agents/skills/api-design/SKILL.md` e `.agents/rules/common.md`.

### Fase B: Execution (Esecuzione)
Una volta approvato il piano, l'AI procede alla scrittura del codice.
- L'AI caricherà le skill specifiche necessarie (es. `.agents/skills/auth-patterns/SKILL.md` se ci sono permessi da gestire).
- Verranno seguite le regole di linguaggio (es. `.agents/rules/typescript.md`).

### Fase C: Review (Revisione)
Dopo l'esecuzione, attiva la revisione specializzata:
- Usa **@code-reviewer** per la qualità del codice.
- Usa **@security-auditor** per un check OWASP.

---

## 🤖 3. Utilizzo delle Personas (Agents)

Puoi invocare agenti specifici taggandoli o chiedendo all'AI di cambiare "mindset":

- **Architect (@architect)**: Quando devi decidere l'architettura o fare un ADR.
- **Security Auditor (@security-auditor)**: Prima di un rilascio critico o per analizzare codice sensibile.
- **Code Reviewer (@code-reviewer)**: Per ottenere feedback costruttivo su un PR o uno snippet.

---

## 🧹 4. Context Hygiene (Pulizia)

Nelle sessioni lunghe, l'AI può confondersi.
- Se l'AI inizia ad allucinare o a ignorare le regole, usa la skill **[`.agents/skills/context-management/SKILL.md`](./.agents/skills/context-management/SKILL.md)**.
- **Azione**: Chiudi la chat attuale, apri un thread nuovo ed esegui nuovamente il `/primer`.

---

## 🛠️ 5. Manutenzione della Libreria

Se sei lo sviluppatore della libreria, usa questi comandi per mantenerla sana:

```bash
# Sincronizza la libreria in un altro progetto
antigravity-sync --target /path/to/project

# Aggiorna il catalogo nel README dopo aver aggiunto file
npm run catalog

# Valida che tutti i file Markdown siano corretti
npm run validate

# Crea un nuovo record di decisione architetturale
npm run adr "Titolo Decisione"
```

---

## 🏆 Case Study: Sviluppo di un Sistema di Pagamenti Idempotente

In questo scenario, vedremo come utilizzare l'intera libreria per costruire una funzionalità critica: un **Gateway di Pagamento Multi-valuta** con supporto alla **Idempotenza** e **Audit Log**.

### Fase 1: Inizializzazione e Allineamento
Iniziamo caricando il contesto per assicurarci che l'AI conosca tutte le regole di Antigravity.
> **User**: `/primer. Devo sviluppare un modulo per pagamenti internazionali.`
> 
> **AI (@base_agent)**: "Ricevuto. Carico `AGENT.md`, le regole di `clean-architecture.md`, `security.md` e i protocolli operativi. Sono pronto per accompagnarti seguendo il Master Agent Protocol."

### Fase 2: Design Architetturale (`/architect`)
Prima di scrivere codice, definiamo la struttura seguendo i principi di design del progetto.
> **User**: `/architect. Progetta il sistema seguendo la Clean Architecture.`
> 
> **AI (@architect)**: Analizza il dominio e propone la struttura:
> - **Domain Layer**: `Payment` (Entity), `Money` (Value Object), `PaymentRepository` (Interface).
> - **UseCase Layer**: `ProcessPayment` (Interactor) con logica di business.
> - **Infrastructure Layer**: `StripeAdapter`, `PostgresRepository`.
> 
> **Output**: Genera un **ADR (Architectural Decision Record)** in `docs/adr/003-payment-idempotency.md` spiegando la scelta strategica dell'idempotenza basata su token nel database di storage.

### Fase 3: Pianificazione Dettagliata (`/planning`)
Definiamo i task atomici per ridurre il rischio di allucinazioni e errori.
> **User**: `/planning. Crea un piano per l'implementazione del Domain layer e dei Test.`
> 
> **AI**: Analizza `.agents/rules/common/tdd.md` e crea `implementation_plan.md`:
> 1. Creazione Value Object `Money` con validazione corretta.
> 2. Implementazione Entity `Payment` con stati (Pending, Completed, Failed).
> 3. Scrittura Test Unitari per il calcolo delle commissioni basati sulla precisione definita in `immutability.md`.

### Fase 4: Esecuzione TDD (`/execution`)
Passiamo all'implementazione guidata dai test (TDD come Design Architetturale).
> **User**: `/execution. Inizia dal Value Object Money.`
> 
> **AI**: Seguendo il protocollo di esecuzione:
> 1. Scrive un test fallimentare (Red) che verifica l'impossibilità di sommare valute diverse.
> 2. Implementa la classe `Money` seguendo `immutability.md` e `solid.md`.
> 3. Esegue refactoring (Green) per ottimizzare la gestione dei "cents" ed evitare errori floating point.

### Fase 5: Hardening e Security Check (`/security-auditor`)
Verifichiamo che i dati sensibili siano gestiti correttamente secondo gli standard OWASP.
> **User**: `@security-auditor. Revisiona il codice del controller dei pagamenti.`
> 
> **AI (@security-auditor)**: Esegue un audit basandosi su `.agents/rules/common/security.md` e identifica che il `CardToken` viene loggato accidentalmente nel trace log.
> 
> **Azione**: Suggerisce l'uso del pattern di mascheramento dei log descritto in `logging.md`.

### Fase 6: Validazione Finale e Sincronizzazione
Infine, rendiamo il lavoro parte della "Project Intelligence".
> **User**: `Finalizza il task e aggiorna la documentazione.`
> 
> **AI**:
> 1. Esegue `npm run validate` per garantire che tutti i file MD (ADR, Piani) rispettino gli standard di qualità 100/100.
> 2. Esegue `npm run catalog` per inserire automaticamente la nuova funzionalità nel catalogo del `README.md`.
> 3. Utilizza `/sync-trace` per salvare lo stato dell'avanzamento nei log di traccia, permettendo alla prossima sessione di ripartire con piena consapevolezza di quanto fatto.

---

## 🐚 6. Utilizzo con Agenti CLI (Claude Code, Gemini CLI)

Gli agenti CLI moderni sono progettati per scoprire automaticamente il contesto del progetto. Antigravity fornisce entry point dedicati:

- **Claude Code**: Utilizza automaticamente il file `CLAUDE.md` per caricare build/test commands e coding standards.
- **Gemini CLI**: Utilizza il file `GEMINI.md` per le istruzioni di sistema e le configurazioni del repository.

### Come Attivarli
Non devi fare nulla! Quando apri Claude Code o Gemini CLI nella cartella del progetto, l'agente leggerà questi file e saprà immediatamente:
1. Quali script eseguire (es. `npm run validate`).
2. Quali regole di Clean Architecture seguire.
3. Dove trovare le skill approfondite.

### Esempi di Prompt utili
```markdown
Usa la skill context-management per ripulire la sessione e poi esegui il primer.
```

> [!TIP]
> Se l'agente CLI sembra ignorare le regole, digli esplicitamente: *"Leggi CLAUDE.md (o GEMINI.md) e AGENT.md per allinearti ai miei standard."*

---

## Checklist di Verifica Finale
- [ ] Il primer è stato eseguito correttamente ad inizio sessione?
- [ ] È stato seguito il ciclo Planning -> Execution -> Review?
- [ ] Le decisioni architetturali sono state documentate tramite ADR?
- [ ] Il codice è stato validato con `npm run validate`?
- [ ] La "Project Intelligence" è stata aggiornata con `npm run catalog`?

## Riferimenti
- [Antigravity Master Agent Protocol](./AGENT.md)
- [Clean Architecture & Standards](./.agents/rules/common.md)
- [Workflow di Architettura](./.agents/workflows/architect.md)
- [Manuale Claude Code](./CLAUDE.md)
- [Manuale Gemini CLI](./GEMINI.md)