---
title: DevOps Pipeline Skill
description: "Standard per CI/CD, Docker e automazione del deployment."
category: "DevOps"
effort: "L"
tags: ["devops", "ci-cd", "docker", "pipeline"]
---

# DevOps Pipeline Skill

> [!TIP]
> Una pipeline affidabile deve essere veloce, deterministica e capace di fallire presto (Fail Fast).

```mermaid
graph LR
    A[Commit] --> B[CI: Test & Lint]
    B --> C[CI: Build Artifacts]
    C --> D[CD: Stage Deploy]
    D --> E[CD: Prod Deploy]
```

Questa skill definisce i pattern per configurare **CI/CD, containerizzazione e monitoring** di un'applicazione. Applicala quando si vuole portare un progetto in produzione o automatizzarne il deployment.

## Il Contesto
Un'app senza pipeline CI/CD dipende da processi manuali soggetti a errori. L'obiettivo è: commit → test automatici → build → deploy, senza intervento manuale.

---

## Pattern 1: GitHub Actions CI/CD

### Pipeline per Node.js / TypeScript
```yaml
# .github/workflows/ci.yml
name: "devops-pipeline"

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      postgres:
        image: postgres:16-alpine
        env:
          POSTGRES_DB: testdb
          POSTGRES_USER: test
          POSTGRES_PASSWORD: test
        ports: ["5432:5432"]
        options: --health-cmd pg_isready --health-interval 10s
      
      redis:
        image: redis:7-alpine
        ports: ["6379:6379"]

    steps:
      - uses: actions/checkout@v4
      
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run linter
        run: npm run lint
      
      - name: Run type check
        run: npm run typecheck
      
      - name: Run migrations
        run: npx prisma migrate deploy
        env:
          DATABASE_URL: postgresql://test:test@localhost:5432/testdb
      
      - name: Run tests
        run: npm test -- --coverage
        env:
          DATABASE_URL: postgresql://test:test@localhost:5432/testdb
          REDIS_URL: redis://localhost:6379
      
      - name: Upload coverage
        uses: codecov/codecov-action@v4

  build:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Build Docker image
        run: docker build -t myapp:${{ github.sha }} .
      
      - name: Push to registry
        run: |
          echo ${{ secrets.REGISTRY_TOKEN }} | docker login ghcr.io -u ${{ github.actor }} --password-stdin
          docker push ghcr.io/${{ github.repository }}:${{ github.sha }}
```

---

## Pattern 2: Docker & Containerizzazione

### Dockerfile ottimizzato (Node.js)
```dockerfile
# Multi-stage build — immagine finale minimale
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app

# Security: non eseguire come root
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 appuser

COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

USER appuser

EXPOSE 3000
ENV NODE_ENV=production PORT=3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s \
  CMD wget -qO- http://localhost:3000/health || exit 1

CMD ["node", "dist/server.js"]
```

### Docker Compose per sviluppo locale
```yaml
# docker-compose.yml  (Docker Compose v2+ — il campo 'version' è deprecato e va omesso)

services:
  app:
    build: .
    ports: ["3000:3000"]
    env_file: .env.local
    depends_on:
      postgres: { condition: service_healthy }
      redis:    { condition: service_healthy }
    volumes:
      - ./src:/app/src  # hot reload in sviluppo

  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: ${DB_NAME}
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${DB_USER}"]
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]

volumes:
  postgres_data:
```

---

## Pattern 3: Gestione degli Ambienti

### Struttura file `.env`
```bash
# .env.example — committato nel repo (senza valori reali)
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/mydb
REDIS_URL=redis://localhost:6379
JWT_SECRET=change-me-in-production
LOG_LEVEL=debug

# File reali NON committati (.gitignore)
# .env.local        → sviluppo locale
# .env.test         → test automatici
# .env.staging      → staging
# .env.production   → produzione (gestite via secrets manager)
```

### Validazione delle variabili d'ambiente all'avvio
```typescript
// src/config/env.ts — valida all'avvio, fail-fast
import { z } from 'zod';

const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'staging', 'production']),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().url(),
  JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 chars'),
});

const parsed = EnvSchema.safeParse(process.env);
if (!parsed.success) {
  console.error('❌ Missing or invalid environment variables:');
  console.error(parsed.error.flatten().fieldErrors);
  process.exit(1); // fail-fast: non avviare l'app con config errata
}

export const env = parsed.data;
```

---

## Pattern 4: Health Checks & Graceful Shutdown

```typescript
// ✅ Health endpoint (required da Docker, Kubernetes, load balancer)
app.get('/health', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;      // check DB
    await redis.ping();                     // check Redis
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  } catch (error) {
    res.status(503).json({ status: 'unhealthy', error: String(error) });
  }
});

// ✅ Graceful shutdown — chiudi le connessioni prima di uscire
process.on('SIGTERM', async () => {
  console.log('SIGTERM received. Graceful shutdown...');
  server.close(async () => {
    await prisma.$disconnect();
    await redis.quit();
    process.exit(0);
  });
});
```

---

## Pattern 5: Logging Strutturato

```typescript
// ✅ pino — logger JSON performante per produzione
import pino from 'pino';

export const logger = pino({
  level: process.env.LOG_LEVEL ?? 'info',
  ...(process.env.NODE_ENV === 'development' && {
    transport: { target: 'pino-pretty', options: { colorize: true } },
  }),
});

// Uso
logger.info({ userId: user.id, action: 'login' }, 'User logged in');
logger.error({ err: error, userId }, 'Failed to process payment');

// ❌ Non usare console.log in produzione
// ❌ Non loggare dati sensibili (password, token, PII)
```

---

## Checklist Pre-Deploy

- [ ] Dockerfile usa multi-stage build e utente non-root
- [ ] `.env.example` è aggiornato con tutte le variabili necessarie
- [ ] Validazione delle env var all'avvio (fail-fast)
- [ ] Health check endpoint `/health` risponde correttamente
- [ ] Graceful shutdown implementato (SIGTERM handler)
- [ ] CI pipeline esegue lint + typecheck + tests prima del deploy
- [ ] Secrets sono in un secrets manager (non hardcoded, non nel repo)
- [ ] Log strutturati in JSON con livello configurabile
- [ ] Migrazioni DB eseguite **prima** del deploy del nuovo codice (blue-green safe)



