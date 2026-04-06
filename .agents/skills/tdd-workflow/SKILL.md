---
name: "tdd-workflow"
description: "Workflow Red-Green-Refactor per un design del codice guidato dai test."
category: "General"
effort: "M"
tags: ["tdd", "testing", "design", "workflow"]
---

# TDD Workflow Skill

Il Test-Driven Development (TDD) serve non solo a prevenire i bug, ma soprattutto a **disegnare** le interfacce e i contratti prima di scrivere l'implementazione pratica.

## Il Ciclo Base
1. **Red**: Scrivi un test che fallisce per la nuova funzionalità. Assicurati che fallisca per il motivo corretto.
2. **Green**: Implementa il codice **minimo necessario** (anche con dati hardcoded) per far passare il test.
3. **Refactor**: Ottimizza e ripulisci il codice mantenendo i test verdi (applica Clean Code, rimuovi duplicazioni, consolida la logica).
4. **Repeat**: Ripeti il ciclo per ogni nuova sotto-funzionalità, sempre a piccoli passi.

## Suggerimenti Pratici
- **Naming dei Test**: Usa nomi descrittivi focalizzati sul comportamento (Behavior). Esempi: `should return 404 when user_id is missing`, `it prevents access if user is not authenticated`. Evita nomi tecnici come `testCalculateMethod`.
- **AAA Pattern**: Struttura i test in `Arrange` (prepara i dati e il contesto), `Act` (esegui l'azione), `Assert` (verifica il risultato).
- **Mocks & Stubs**: Moka le dipendenze esterne (DB, API) per isolare l'unità di codice in test, specialmente quando testi i *Use Cases* della Clean Architecture.



