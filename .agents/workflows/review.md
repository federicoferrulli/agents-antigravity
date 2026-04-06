---
description: Review Workflow
---

# Review Workflow

Una volta che gli step di esecuzione (`[Execution](./execution.md)`) sono completati, entra in gioco la fase di Review e validazione per assicurare la massima qualità del rilascio.

## Step da seguire

1. **Auto-Riflessione (Self-Reflection)**:
   - Verifica di aver applicato tutte le regole definite in `docs/rules/common.md`.
   - Controlla se la struttura segue i dettami della **Clean Architecture**.

2. **Security Audit**:
   - Assicurati che il codice aderisca rigorosamente a `docs/rules/security.md`.
   - Controlla vulnerabilità comuni (OWASP), validazione input e gestione segreti.

3. **Verifica della Solidità**:
   - Accertati che i test passino correttamente (TDD workflow confermato).
   - Se ci sono istruzioni sistematiche per il controllo (`pre_commit_instructions`), consultale e verifica i passi obbligatori prima del commit.

3. **Allineamento alla Persona**:
   - Hai risposto nel tono e con lo stile dell'agente assegnato (es. `agents/base_agent.md`, da Software Engineer Senior)?
   - Assicurati che il codice sia non solo funzionale ma *elegante* e *scalabile*.

4. **Knowledge Extraction (Continuous Learning)**:
   - Rifletti sull'attività appena conclusa: *Hai risolto un bug complesso? Creato un nuovo tool? Implementato un un pattern di integrazione difficile?*
   - Se sì, **è tuo obbligo** chiedere all'utente se desidera astrarre la logica in una nuova Skill in `skills/` o in un aggiornamento di regola in `docs/rules/`. Segui le istruzioni di `docs/rules/continuous-learning.md`.

5. **Finalizzazione / Submit**:
   - Assicurati che i commit message riflettano coerentemente e sinteticamente cosa è stato realizzato.
   - Sottometti le modifiche rispettando il normale flusso di PR/commit.

**Importante:** Non richiedere all'utente di compiere azioni manuali di test o validazione dell'ambiente, l'agente è responsabile di farlo autonomamente.