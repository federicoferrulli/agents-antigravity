---
name: "refactoring-guide"
description: "Tecniche per migliorare la struttura del codice senza alterarne il comportamento."
category: "General"
effort: "M"
tags: ["refactoring", "clean-code", "debt", "quality"]
---

# Refactoring Guide

Il Refactoring è il processo di miglioramento della struttura interna del codice senza alterarne il comportamento esterno (funzionalità immutata).

## Principi Fondamentali
- **Mai Refactoring senza Test**: Non modificare il design se prima non hai scritto i test (preferibilmente Unit/Integration) che definiscono i comportamenti chiave di quel file/modulo.
- **Piccoli Passi**: Fai un piccolo refactoring alla volta, committa e testa. Evita di re-ingegnerizzare grandi porzioni tutte insieme (scoprirai bug complessi).

## Tecniche Comuni (Martin Fowler)
1. **Extract Method / Extract Function**: Se un metodo è troppo lungo o necessita di commenti per spiegarne le parti, estrai quelle parti in metodi con nomi chiari e descrittivi, riducendo le dimensioni della funzione originale e aumentandone la leggibilità.
2. **Rename Variabile / Metodo**: Chiarifica l'intento cambiando nomi generici (`calculate`, `val`, `data`) in nomi specifici (`calculateTaxes`, `userAccount`, `transactionData`).
3. **Move Method / Field**: Sposta le funzioni vicino ai dati su cui operano, o verso la classe / entità in cui logicamente appartengono (principio di coesione).
4. **Replace Magic Numbers with Constants**: Trasforma letterali numerici oscuri (`if status == 5`) in costanti descrittive (`if status === STATUS_ARCHIVED`).

## Gestione del Debito Tecnico
Non aspettare un'attività "dedicata" al debito tecnico ("big bang release"). Applica la "Regola del Boy Scout": lascia sempre il codice un po' meglio di come l'hai trovato.



