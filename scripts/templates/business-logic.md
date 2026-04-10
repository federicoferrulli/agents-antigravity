---
title: "Business Logic: [Nome del Processo]"
description: "Definizione della logica di business estratta o specifica per [Modulo]."
tags: [business-logic, domain, rules]
---

# Business Logic: [Nome del Processo]

Questa regola definisce come deve comportarsi il sistema per il dominio specifico di [Modulo], indipendentemente dai vincoli tecnici legacy.

## 📋 Specifiche di Dominio
Descrivi qui le regole di business invocate dall'utente o estratte dal codice.
- **Regola 1**: [Dettaglio]
- **Regola 2**: [Dettaglio]

## 🏗️ Mappatura Tecnica (Legacy Context)
Collega i concetti di business ai file reali identificati tramite il Knowledge Graph.
- **Nucleo della Logica**: `path/to/file.js`
- **Punto di Ingresso**: `path/to/api.js`
- **Vincoli**: [Annotazioni su debito tecnico o bug noti da preservare/correggere]

## ⚡ Implementazione Suggerita
Esempi di come l'AI deve tradurre queste specifiche in codice.

```javascript
// Esempio di applicazione delle Business Rules
```

## ## Checklist di Dominio
- [ ] La logica è stata validata con il report di Graphify?
- [ ] Le specifiche coprono i casi limite (edge cases) del dominio?
- [ ] È chiaro il confine tra business logic e implementazione tecnica?

## ## Riferimenti
- [Antigravity Agent Protocol](../../AGENT.md)
- [Clean Architecture Standards](../../rules/common/clean-architecture.md)
