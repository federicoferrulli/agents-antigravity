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

## 💡 Esempio di Caso d'Uso Completo

1. **User**: `/primer. Devo rifattorizzare il login.`
2. **AI**: Legge le regole e propone un piano (`implementation_plan.md`) usando `.agents/skills/auth-patterns/SKILL.md`.
3. **User**: `Approvo.`
4. **AI**: Implementa il codice seguendo `.agents/rules/security.md`.
5. **User**: `@security-auditor fai un controllo.`
6. **AI (@security-auditor)**: Identifica un rischio di session fixation e suggerisce il fix.
7. **User**: `Applica. Poi aggiorna il catalogo.`
8. **AI**: Applica il fix, gira `npm run catalog` e chiude il task.

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