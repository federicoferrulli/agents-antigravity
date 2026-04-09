---
title: Performance Optimization Skill
description: "Pattern sistematici per identificare e risolvere colli di bottiglia."
category: "Backend"
effort: "L"
tags: ["performance", "optimization", "caching", "db-tuning"]
---

# Performance Optimization Skill

> [!TIP]
> L'ottimizzazione prematura è la radice di tutti i mali. Misura prima di agire.

```mermaid
graph LR
    A[Analisi: Profiling] --> B[Identificazione Bottleneck]
    B --> C[Intervento: Caching/Index/Logic]
    C --> D[Validazione: Benchmarking]
    D --> E{Performance OK?}
    E -- No --> A
    E -- Sì --> F[Deploy]
```

Questa skill definisce i pattern sistematici per identificare e risolvere i problemi di performance. Applicala quando ricevi segnalazioni di lentezza o in fase di code review proattiva.

## Il Contesto
La performance non è un'aggiunta, è una proprietà del design. I bottleneck più comuni sono: N+1 query, mancanza di cache, serializzazione lenta e operazioni bloccanti nel thread principale.

---

## Pattern 1: Caching Strategy

### Livelli di Cache (priorità decrescente di efficacia)
```
L1 → In-Memory (applicazione)   → <1ms,  volatile, per-instance
L2 → Redis / Memcached          → 1-5ms, condiviso tra istanze, TTL configurabile
L3 → CDN / HTTP Cache           → <50ms, per asset statici e API pubbliche
L4 → Database Query Cache       → configurabile nel DB stesso
```

### Redis — Implementazione
```typescript
import { Redis } from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

// ✅ Cache-Aside Pattern (Lazy Loading)
async function getUserById(id: string): Promise<User> {
  const cacheKey = `user:${id}`;

  // 1. Cerca in cache
  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached);

  // 2. Cache miss → query DB
  const user = await userRepo.findById(id);
  if (!user) throw new NotFoundError(`User ${id}`);

  // 3. Popola cache con TTL
  await redis.setex(cacheKey, 3600, JSON.stringify(user)); // TTL: 1 ora

  return user;
}

// ✅ Cache Invalidation — invalida su write
async function updateUser(id: string, data: UpdateUserDTO): Promise<User> {
  const user = await userRepo.update(id, data);
  await redis.del(`user:${id}`); // invalida la cache
  return user;
}

// ✅ Cache warming per dati critici all'avvio
async function warmCache() {
  const popularProducts = await productRepo.findTopSelling(100);
  const pipeline = redis.pipeline();
  for (const p of popularProducts) {
    pipeline.setex(`product:${p.id}`, 86400, JSON.stringify(p));
  }
  await pipeline.exec();
}
```

### HTTP Cache Headers
```typescript
// ✅ Per risorse immutabili (hash nel filename)
res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');

// ✅ Per API con dati che cambiano poco
res.setHeader('Cache-Control', 'private, max-age=300'); // 5 minuti, solo client

// ✅ Per API con dati dinamici — usa ETag
const etag = generateEtag(JSON.stringify(data));
if (req.headers['if-none-match'] === etag) return res.status(304).send();
res.setHeader('ETag', etag);
res.setHeader('Cache-Control', 'no-cache');
```

---

## Pattern 2: Database — Query Optimization

### N+1 Problem Detection & Fix
```typescript
// ❌ N+1 — rilevabile con query logging o APM
const users = await User.findAll(); // 1 query
for (const user of users) {
  user.orders = await Order.findByUserId(user.id); // N query!
}

// ✅ Fix: JOIN / Include
const users = await prisma.user.findMany({
  include: { orders: true },
});

// ✅ Fix: DataLoader per GraphQL / micro-batching
const orderLoader = new DataLoader(async (userIds: readonly string[]) => {
  const orders = await Order.findAll({ where: { userId: { $in: userIds } } });
  return userIds.map(id => orders.filter(o => o.userId === id));
});
```

### Paginazione — Cursor vs Offset
```typescript
// ❌ OFFSET pagination — lenta su tabelle grandi (conta sempre N righe)
const page1 = await db.query('SELECT * FROM orders LIMIT 20 OFFSET 100000');

// ✅ Cursor-based pagination — O(log n) con indice
async function getOrdersAfterCursor(cursor?: string, limit = 20) {
  return prisma.order.findMany({
    take: limit + 1, // prendi 1 in più per sapere se c'è una pagina successiva
    cursor: cursor ? { id: cursor } : undefined,
    orderBy: { createdAt: 'desc' },
    skip: cursor ? 1 : 0,
  });
}
```

---

## Pattern 3: Connection Pooling

```typescript
// ✅ Prisma — pool configurato
// DATABASE_URL="postgresql://user:pass@host/db?connection_limit=10&pool_timeout=20"

// ✅ pg (node-postgres) — pool esplicito
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10,               // max connessioni simultanee
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// ✅ Redis — riusa la connessione (singleton)
// Non creare new Redis() per ogni request — usa un singleton inizializzato all'avvio
```

---

## Pattern 4: Async Processing & Message Queues

Per operazioni pesanti o non-critiche per la risposta HTTP, usa code di messaggi.

```typescript
// ✅ BullMQ (Redis-based) — ideal per task asincroni
import { Queue, Worker } from 'bullmq';

// Producer (nell'API handler)
const emailQueue = new Queue('email', { connection: redis });

async function registerUser(dto: CreateUserDTO) {
  const user = await userService.create(dto);

  // Non attendere — metti in coda (risposta immediata all'utente)
  await emailQueue.add('welcome-email', { userId: user.id, email: user.email });

  return user; // risponde in <50ms invece di attendere l'invio email
}

// Consumer (processo separato)
const emailWorker = new Worker('email', async (job) => {
  await emailService.sendWelcome(job.data);
}, { connection: redis, concurrency: 5 });
```

---

## Pattern 5: Profiling & Misurazione

> **Regola d'oro**: Non ottimizzare ciò che non hai misurato.

### Strumenti
| Tool | Uso |
|---|---|
| **Clinic.js** | Profiling Node.js (flame chart, heap, I/O) |
| **APM** (Datadog, New Relic) | Performance in produzione, distributed tracing |
| **EXPLAIN ANALYZE** | Query plan PostgreSQL |
| **Autocannon / k6** | Load testing e benchmarking HTTP |

```bash
# ✅ Query plan in Postgres
EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT)
SELECT * FROM orders WHERE user_id = '...' ORDER BY created_at DESC LIMIT 20;

# ✅ Load test con k6
k6 run --vus 100 --duration 30s load-test.js
```

---

## Checklist Performance Review

- [ ] Le query intensive usano i giusti indici (verificato con EXPLAIN ANALYZE)
- [ ] Nessun N+1 query nei pattern di lettura
- [ ] Le operazioni costose (email, PDF, export) sono asincrone (queue)
- [ ] I dati frequenti sono cachati con TTL appropriato
- [ ] La paginazione usa cursor-based su dataset > 10k record
- [ ] Il connection pool è configurato (non una connessione per request)
- [ ] Gli asset statici hanno header `Cache-Control: immutable`



