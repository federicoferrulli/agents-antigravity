---
name: "documentation-standards"
description: "Linee guida per documentazione tecnica chiara, scalabile e AI-friendly."
category: "General"
effort: "S"
tags: ["documentation", "standards", "markdown", "technical-writing"]
---

# Documentation Standards

Aderisci sempre agli standard di documentazione per assicurare che altri agenti, bot LLM o ingegneri umani possano mantenere il sistema.

## File "README.md" Locali
- Ogni modulo o package fondamentale (es. `src/auth`, o cartelle root) dovrebbe disporre di un piccolo `README.md` che spiega:
  1. Cosa fa il componente.
  2. Modelli di dati / Architettura principale.
  3. Comandi utili o prerequisiti associati a quel particolare modulo.

## JSDoc / TSDoc / Docstrings
- Aggiungi un blocco documentale in cima a funzioni ed entità esposte (pubbliche), file config centrali o utils/adapter esterni.
- Scopo: non dire *"Questo aggiunge x e y"*. Cerca di spiegare lo scopo del blocco o parametri ambigui.
- Esempio corretto in JS/TS:
```typescript
/**
 * Calcola l'hash univoco partendo da input string basato sull'algoritmo configurabile.
 * Utile per generare un ETag o un cache key veloce senza collissioni.
 *
 * @param {string} payload Il valore su cui effettuare l'hashing
 * @param {string?} algorithm L'algoritmo; di default usa SHA-256 se non specificato.
 * @returns {string} L'hash esadecimale restituito
 */
```

## "Clean" Comments In-Code
- Il codice dovrebbe essere auto-documentante (attraverso le regole Naming `common.md`). Se devi scrivere un lungo commento dentro la fuzione per spiegare *cosa sta facendo* o il *come*, molto probabilmente hai bisogno di applicare una tecnica di **Extract Method** (`refactoring.md`).
- I commenti si dovrebbero utilizzare principalmente per spiegare il *Perché* hai preso una decisione architetturale particolare, spesso quando utilizzi hack specifici (e.g., ignorare lint, regex estese di workaround, eccellente debito da riparare).



