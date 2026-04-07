---
title: Trace Synchronization Workflow
description: Sincronizza lo stato dell'agente leggendo l'indice e i log di traccia in logTrace/.
tags: [traceability, synchronization, memory, context]
---

# Trace Synchronization Workflow

Questo workflow viene attivato tramite `/sync-trace` e serve a ricostruire lo stato mentale dell'agente analizzando la cronologia delle modifiche registrate in `logTrace/`.

## Quando eseguire /sync-trace?
- Quando si riprende un lavoro interrotto.
- Quando il `primer` generale non è sufficiente a capire "cosa è stato fatto esattamente nell'ultima ora".
- Prima di iniziare un task che dipende da modifiche recenti non ancora consolidate nella documentazione principale.

## Procedura di Sincronizzazione

### 1. Scansione dell'Indice
L'agente deve leggere [INDEX.md](file:///c:/repository/agents/logTrace/INDEX.md) per identificare gli ultimi task completati o in corso.

### 2. Deep Dive sull'Ultimo Log
L'agente legge l'ultimo file di log (identificato dall'ID più recente) per capire:
- L'obiettivo specifico dell'ultima richiesta.
- I file effettivamente toccati.
- Eventuali blocchi o decisioni architetturali (ADR light).

### 3. Ripristino dei Puntatori
L'agente aggiorna la sua visione interna:
- Qual è il file attivo?
- Qual è il prossimo test da far passare (TDD)?

## Output del Workflow
L'agente deve confermare la sincronizzazione con un breve riassunto:
```markdown
# Sync-Trace Completato
- Ultimo Log: [ID-LOG] ([TITOLO])
- Stato: [SINTESI_STATO]
- Prossimo Step: [AZIONE_CONSIGLIATA]
```

---
*v1.0 - Antigravity Traceability System*
