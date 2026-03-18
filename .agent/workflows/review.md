# Review Workflow

Una volta che gli step di esecuzione (`[Execution](./execution.md)`) sono completati, entra in gioco la fase di Review e validazione per assicurare la massima qualità del rilascio.

## Step da seguire

1. **Auto-Riflessione (Self-Reflection)**:
   - Verifica di aver applicato tutte le regole definite in `docs/rules/common.md`.
   - Controlla se la struttura segue i dettami della **Clean Architecture**.
   - Accertati che non siano stati introdotti problemi di sicurezza (`OWASP`).

2. **Verifica della Solidità**:
   - Accertati che i test passino correttamente (TDD workflow confermato).
   - Se ci sono istruzioni sistematiche per il controllo (`pre_commit_instructions`), consultale e verifica i passi obbligatori prima del commit.

3. **Allineamento alla Persona**:
   - Hai risposto nel tono e con lo stile dell'agente assegnato (es. `agents/base_agent.md`, da Software Engineer Senior)?
   - Assicurati che il codice sia non solo funzionale ma *elegante* e *scalabile*.

4. **Finalizzazione / Submit**:
   - Assicurati che i commit message riflettano coerentemente e sinteticamente cosa è stato realizzato.
   - Sottometti le modifiche rispettando il normale flusso di PR/commit.

**Importante:** Non richiedere all'utente di compiere azioni manuali di test o validazione dell'ambiente, l'agente è responsabile di farlo autonomamente.