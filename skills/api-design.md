---
title: "API Design Standards"
description: "Standard per la creazione di API RESTful e documentazione OpenAPI."
category: "Backend"
effort: "M"
tags: ["api", "rest", "openapi", "standards"]
---

# API Design Standards

Queste istruzioni si applicano ogni volta che generi router, controller o specchi OpenAPI.

## RESTful Principals
- **Nouns, Not Verbs**: Gli endpoint URL devono rappresentare risorse (`/users`), non azioni (`/getUsers`). Usa verbi HTTP per specificare l'azione:
  - `GET /users` (Read All)
  - `GET /users/{id}` (Read One)
  - `POST /users` (Create)
  - `PUT /users/{id}` (Update Entire Resource)
  - `PATCH /users/{id}` (Update Partial Resource)
  - `DELETE /users/{id}` (Delete)
- **Plurals**: Utilizza quasi sempre nomi plurali per consistenza (`/products` e `/products/123`).

## Responses & Status Codes
Restituisci risposte standardizzate in JSend o in formato Envelope:
```json
{
  "status": "success",
  "data": { ... }
}
```
Usa *sempre* lo status code di risposta corretto:
- `200 OK` (successo generale), `201 Created` (creazione terminata).
- `400 Bad Request` (input invalido dal client).
- `401 Unauthorized` (non autenticato), `403 Forbidden` (autenticato ma blocato dai ruoli).
- `404 Not Found` (risorsa ID mancante).
- `500 Internal Server Error` (eccezione del codice interno, non inviare lo Stack Trace fuori).

## Paginazione e Filtraggio
Ritorna collezioni di risorse paginando via query parameters: `GET /users?page=1&limit=20`. Ritorna l'`offset`, il numero di `total_items`, `current_page`.
