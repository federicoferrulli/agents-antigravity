# Main Workflow Orchestrator

Questo file definisce il flusso di lavoro principale per gli agenti all'interno del workspace Antigravity. Ogni richiesta complessa o task di sviluppo deve seguire questo ciclo di vita.

## Fasi del Workflow

1. **[Planning](./planning.md)**: Analisi della richiesta, esplorazione del codice e pianificazione delle attività.
2. **[Execution](./execution.md)**: Implementazione iterativa del codice seguendo gli standard (Clean Architecture, TDD).
3. **[Review](./review.md)**: Verifica finale del lavoro, riflessione sulla sicurezza e validazione del risultato.

## Come utilizzare questo workflow
Quando inizi un nuovo task, non passare subito all'esecuzione. Leggi e applica le linee guida descritte in `planning.md`. Una volta che il piano è approvato o stabilito, procedi con `execution.md`. Infine, prima di completare e submittare, segui le direttive di `review.md`.

Inoltre, assicurati sempre di:
- Caricare le regole base da `docs/rules/common.md`.
- Assumere la corretta persona dall'agente (es. `agents/base_agent.md`).
