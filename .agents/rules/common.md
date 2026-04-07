---
title: "Common Rules"
description: "Regole universali applicabili a ogni riga di codice generata."
category: "General"
severity: "Critical"
tags: ["clean-architecture", "solid", "naming", "error-handling"]
---

# Common Rules

Queste regole si applicano a **tutto il codice generato**, indipendentemente dal linguaggio o framework. Rappresentano il contratto minimo di qualità per ogni output.

---

## 1. Clean Architecture

Separa sempre le preoccupazioni in livelli distinti e a dipendenza unidirezionale:

| Layer | Responsabilità | Dipende da |
|---|---|---|
| **Entities** | Oggetti di dominio puri, regole di business core | Nessuno |
| **Use Cases** | Orchestrano il flusso di dati, *applicano* le regole | Entities |
| **Interface Adapters** | Convertono dati: Controller, Presenter, Gateway | Use Cases |
| **Frameworks & Drivers** | DB, Web Framework, UI — dettagli implementativi | Interface Adapters |

> [!NOTE]
> Le dipendenze puntano sempre verso i layer interni. Questo significa che le Entities non possono "importare" nulla dagli Use Cases, e gli Use Cases non sanno nulla del Database o del Web Server.

```mermaid
graph TD
    subgraph "Clean Architecture Layers"
        FD[Frameworks & Drivers] --> IA[Interface Adapters]
        IA --> UC[Use Cases]
        UC --> E[Entities]
    end
```


```
// ✅ CORRETTO — Use Case non conosce Express
class CreateUserUseCase {
  constructor(private userRepo: UserRepository) {}
  async execute(data: CreateUserDTO): Promise<User> {
    const user = User.create(data); // logica di dominio pura
    return this.userRepo.save(user);
  }
}

// ❌ SBAGLIATO — Use Case accoppiato a Express
class CreateUserUseCase {
  async execute(req: Request, res: Response) { ... }  // dipendenza da framework
}
```

---

## 2. Principi SOLID

- **S — Single Responsibility**: Una classe/funzione = un motivo per cambiare.
- **O — Open/Closed**: Estendi il comportamento (Strategy, Plugin) senza modificare il codice esistente.
- **L — Liskov Substitution**: Le implementazioni concrete devono essere intercambiabili con le astrazioni (`UserRepository` → `MongoUserRepository` o `InMemoryUserRepository`).
- **I — Interface Segregation**: Preferisci interfacce piccole e specifiche a monoliti.
- **D — Dependency Inversion**: Dipendi da astrazioni (`interface`), non da implementazioni concrete.

```typescript
// ✅ Dependency Inversion — il Use Case dipende dall'interfaccia, non da Mongoose
interface UserRepository {
  findById(id: string): Promise<User | null>;
  save(user: User): Promise<User>;
}

class CreateUserUseCase {
  constructor(private repo: UserRepository) {} // iniettato dall'esterno
}
```

---

## 3. Error Handling

Non ignorare **mai** gli errori. Uso di `try/catch` e tipi di errore espliciti.

```typescript
// ✅ CORRETTO
async function getUserById(id: string): Promise<User> {
  try {
    const user = await userRepository.findById(id);
    if (!user) throw new NotFoundError(`User ${id} not found`);
    return user;
  } catch (error) {
    logger.error('getUserById failed', { id, error });
    throw error; // re-throw dopo il log, non ingoiare
  }
}

// ❌ SBAGLIATO — errore ingoiato silenziosamente
async function getUserById(id: string) {
  try {
    return await userRepository.findById(id);
  } catch (e) { return null; }
}
```

**Regole**:
- Usa error classes personalizzate (`NotFoundError`, `ValidationError`, `UnauthorizedError`).
- Non esporre **mai** stack trace all'utente finale in produzione.
- Usa codici di errore standard HTTP (400, 401, 403, 404, 500).

---

## 4. Immutability

Preferisci strutture dati immutabili per prevenire side effect inaspettati.

```typescript
// ✅ CORRETTO
const config = Object.freeze({ maxRetries: 3, timeout: 5000 });
const updatedUser = { ...user, name: 'Mario' }; // copia, non mutazione

// ❌ SBAGLIATO
config.maxRetries = 5;  // mutazione silently ignorata su oggetti frozen, o bug su non-frozen
user.name = 'Mario';    // mutazione diretta dell'oggetto
```

---

## 5. Naming Conventions

I nomi devono comunicare **intento**, non implementazione.

| ❌ Generico | ✅ Descrittivo |
|---|---|
| `getData()` | `getUserProfileById()` |
| `val`, `x`, `tmp` | `invoiceTotal`, `retryCount` |
| `handle()` | `handlePaymentWebhook()` |
| `Manager` | `UserSessionCoordinator` |
| `isOk` | `isUserEmailVerified` |

**Convenzioni**:
- **camelCase** per variabili e funzioni.
- **PascalCase** per classi, interfacce e tipi.
- **UPPER_SNAKE_CASE** per costanti globali.
- **kebab-case** per file e directory.

---

## 6. OWASP — Secure by Default

Ogni output di codice deve considerare nativamente la sicurezza. Vedi [`security.md`](./security.md) per le regole complete. Regola minima: **non fidarti mai dell'input esterno** — valida, sanitizza ed esegui escape sempre.

---

## 7. Logging Standards

Il logging è una preoccupazione trasversale — si applica a **tutti i layer**, non solo all'infrastruttura.

```typescript
// ✅ Log strutturato in JSON (usa pino, winston o equivalente)
logger.info({ userId: user.id, action: 'order.created', orderId: order.id }, 'Order created');
logger.error({ err: error, userId }, 'Payment processing failed');

// ❌ SBAGLIATO — log non strutturato e con dati sensibili
console.log(`User ${user.email} logged in with password ${password}`);
```

**Regole**:
- **Mai loggare**: password, token JWT/API key, dati PII (email, CF, numero carta) in chiaro.
- Usa livelli semantici: `debug` (dev only) · `info` (eventi business) · `warn` (anomalie non bloccanti) · `error` (errori operativi) · `fatal` (crash).
- In produzione usa formato **JSON strutturato** (non testo libero) — permette indexing e alerting.
- Includi sempre un `correlationId` / `requestId` per tracciare un'intera request chain.
- Non usare `console.log` in produzione: usa una libreria configurabile (pino, winston).
