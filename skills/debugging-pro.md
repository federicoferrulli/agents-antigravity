---
title: "Systematic Debugging Pro"
description: "Metodologia scientifica per la risoluzione rapida di bug complessi."
category: "General"
effort: "M"
tags: ["debugging", "troubleshooting", "methodology"]
---

# Systematic Debugging Pro

Il debugging non consiste nel tirare a indovinare. È un processo scientifico di osservazione, formulazione di tesi, esperimenti temporanei e analisi.

## L'Approccio Metodico
1. **Isolamento (Isolate the Error)**: 
   - Non provare a fixare l'intero programma se l'errore è in fondo a uno stack enorme.
   - Crea un ambiente isolato, se necessario estraendo i soli file che interagiscono in quel contesto.
2. **Riproducibilità (Reproduce)**:
   - Se non sei in grado di riprodurre il test sul tuo ambiente/script, fermati. Prima devi comprendere quali input, passaggi e log ambientali generano il bug in modo deterministico.
   - Idealmente, scrivi uno Unit o Integration Test automatico che fallisca *esattamente* replicando il bug (il test documenterà la issue).
3. **Identificazione (Root Cause Analysis)**:
   - Usa tecniche come la Binary Search / Divide et Impera partendo dai log. (Togli o aggiungi un `return` fittizio a riga P/2, per scoprire se l'errore succede prima o dopo P/2).
   - "Five Whys": Chiediti 5 volte "Perché è successo?". Es: Perché c'è NulReferenceException? Perché il DB ha ritornato NULL. Perché? Perché l'ID era errato. Perché? Ecc.
4. **Risoluzione & Verifica (Fix & Verify)**:
   - Implementa il fix.
   - Assicurati che scaturiscano esiti verdi anche per il test scritto prima (step 2).
   - Analizza la regressione: chiediti "Questo fix romperà qualcos'altro in altre aree?".

## Strumenti ed Osservabilità
- Smetti di usare massivamente `console.log()` sparsi. Usa breakpoint, ispezione dello stack e step-by-step debug nei file interessati. 
- Aggiungi logging e tracing strutturato anziché messaggi temporanei.
