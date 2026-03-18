---
title: "Frontend Rules"
description: "Standard per UI/UX, accessibilità e testing frontend."
category: "Frontend"
severity: "Important"
tags: ["frontend", "vue", "react", "testing", "a11y"]
---

# Frontend Rules

Queste regole si applicano allo sviluppo di **qualsiasi interfaccia utente** (Web, Mobile, Desktop). Framework-agnostic dove possibile, con note specifiche per Vue e React.

---

## 1. Component Design

### Single Responsibility
Ogni componente deve fare **una sola cosa**. Se un componente supera le ~150 righe, considerane la scomposizione.

```
// ✅ Struttura componente ben separata
UserProfile/
├── UserProfile.vue          # Componente contenitore (smart)
├── UserAvatar.vue           # Componente presentazionale (dumb)
├── UserStats.vue            # Componente presentazionale
└── useUserProfile.ts        # Logica business nel composable/hook
```

### Container vs Presentational (Smart vs Dumb)
| Tipo | Responsabilità | Caratteristiche |
|---|---|---|
| **Container (Smart)** | Fetching, stato, logica | Connesso a store/API, stateful |
| **Presentational (Dumb)** | Rendering | Stateless, solo props/emit |

```typescript
// ✅ Componente presentazionale — riceve tutto via props, nessuna dipendenza esterna
// UserCard.vue
defineProps<{ user: UserDTO; isLoading: boolean }>();
defineEmits<{ 'edit': [id: string]; 'delete': [id: string] }>();
```

---

## 2. State Management

### Gerarchia
1. **Locale** (`ref`, `useState`) → preferito per stato UI efimero (modal aperta, tab attiva).
2. **Composable/Hook** (`useUserProfile`) → stato condiviso tra componenti della stessa feature.
3. **Store globale** (Pinia, Zustand, Redux) → solo per stato applicazione realmente globale (utente autenticato, tema, notifiche).

```typescript
// ✅ Pinia Store ben strutturato
export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<User | null>(null);
  const isLoading = ref(false);

  // Getters (computed)
  const isAuthenticated = computed(() => user.value !== null);
  const userRole = computed(() => user.value?.role ?? 'GUEST');

  // Actions
  async function login(credentials: LoginDTO) {
    isLoading.value = true;
    try {
      user.value = await authService.login(credentials);
    } finally {
      isLoading.value = false;
    }
  }

  return { user, isLoading, isAuthenticated, userRole, login };
});
```

**Regola**: non mettere nello store quello che può rimanere locale.

---

## 3. Accessibilità (a11y)

Ogni componente UI deve soddisfare il livello **WCAG 2.1 AA**.

### Must-Have
```html
<!-- ✅ Immagini -->
<img src="avatar.jpg" alt="Foto profilo di Mario Rossi" />
<img src="icon-decorative.svg" alt="" role="presentation" /> <!-- Decorativa -->

<!-- ✅ Form con label associato -->
<label for="email">Email</label>
<input id="email" type="email" aria-required="true" aria-describedby="email-hint" />
<p id="email-hint">Usa il tuo indirizzo email aziendale.</p>

<!-- ✅ Bottoni con significato chiaro -->
<button aria-label="Elimina ordine #1234">
  <svg aria-hidden="true">...</svg> <!-- icone decorative hidden da screen reader -->
</button>

<!-- ✅ Route changes (SPA) — annuncia la navigazione -->
<div aria-live="polite" aria-atomic="true">{{ pageTitle }}</div>
```

### Checklist a11y
- [ ] Tutti i form input hanno `<label>` associati via `for` / `id`
- [ ] Ordine di focus logico via Tab
- [ ] Contrasto colore ≥ 4.5:1 (usa [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/))
- [ ] Le azioni interattive funzionano da tastiera (Enter, Space, Esc)
- [ ] Nessun contenuto informativo solo tramite colore

---

## 4. Performance Frontend

### Lazy Loading
```typescript
// ✅ Vue — route-level code splitting
const UserProfile = defineAsyncComponent(() => import('./UserProfile.vue'));

// ✅ React
const UserProfile = React.lazy(() => import('./UserProfile'));
```

### Immagini
```html
<!-- ✅ Lazy loading nativo -->
<img src="photo.jpg" loading="lazy" width="400" height="300" alt="..." />

<!-- ✅ Formati moderni con fallback -->
<picture>
  <source srcset="photo.avif" type="image/avif" />
  <source srcset="photo.webp" type="image/webp" />
  <img src="photo.jpg" alt="..." />
</picture>
```

### Rendering Ottimizzato
```typescript
// ✅ Vue — evita re-render non necessari
const expensiveValue = computed(() => heavyCalculation(data.value)); // cached

// ✅ React
const expensiveValue = useMemo(() => heavyCalculation(data), [data]);
const stableCallback = useCallback((id: string) => deleteItem(id), []);
```

---

## 5. Responsive Design

- **Mobile-first**: scrivi prima gli stili per mobile, poi sovrascrivi per schermi più grandi.
- Usa unità relative: `rem`, `em`, `%`, `dvh`, `svw` — evita `px` per le dimensioni di layout.
- Breakpoint standard: `sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`.

```css
/* ✅ Mobile-first */
.card {
  display: flex;
  flex-direction: column; /* mobile: verticale */
}

@media (min-width: 768px) {
  .card {
    flex-direction: row; /* tablet+: orizzontale */
  }
}
```

---

## 6. Error Handling UI

```typescript
// ✅ Pattern: Error Boundary (React) / onErrorCaptured (Vue)
// Mostra sempre un'UI di fallback, non uno schermo vuoto o blank

// ✅ Stati da gestire sempre in ogni operazione asincrona
const state = {
  data: null,
  isLoading: false,
  error: null,
};

// ✅ Feedback utente
// - Loading → skeleton screen o spinner
// - Errore → messaggio human-readable + azione di recovery (Riprova)
// - Vuoto → empty state illustrato con chiamata all'azione
```

---

## 7. Sicurezza Frontend

- Non salvare **mai** token o dati sensibili in `localStorage` (vulnerabile a XSS). Usa `HttpOnly` cookie.
- Sanifica sempre l'input prima di renderizzarlo con `v-html` / `dangerouslySetInnerHTML`.
- Usa `Content Security Policy (CSP)` per prevenire injection di script esterni.
- Valida i dati anche lato client (UX), ma **la validazione autoritativa è sempre server-side**.

---

## 8. Testing UI

Segui la piramide dei test anche per il frontend: molti **component test**, pochi **E2E**.

### Component Testing — Vitest + Testing Library

```typescript
// ✅ Vue — @testing-library/vue
import { render, screen, fireEvent } from '@testing-library/vue';
import UserCard from './UserCard.vue';

describe('UserCard', () => {
  const user = { id: '1', name: 'Mario Rossi', role: 'ADMIN' };

  it('renders user name and role', () => {
    render(UserCard, { props: { user } });
    expect(screen.getByText('Mario Rossi')).toBeTruthy();
    expect(screen.getByText('ADMIN')).toBeTruthy();
  });

  it('emits "edit" event on button click', async () => {
    const { emitted } = render(UserCard, { props: { user } });
    await fireEvent.click(screen.getByRole('button', { name: /modifica/i }));
    expect(emitted()['edit']).toEqual([['1']]);
  });

  it('shows skeleton when isLoading is true', () => {
    render(UserCard, { props: { user, isLoading: true } });
    expect(screen.getByTestId('skeleton-loader')).toBeTruthy();
    expect(screen.queryByText('Mario Rossi')).toBeNull();
  });
});
```

### E2E — Playwright

```typescript
// ✅ Playwright — testa solo flussi critici (login, checkout, form principale)
import { test, expect } from '@playwright/test';

test.describe('Login Flow', () => {
  test('successful login redirects to dashboard', async ({ page }) => {
    await page.goto('/login');
    await page.fill('[data-testid="email-input"]', 'admin@test.it');
    await page.fill('[data-testid="password-input"]', 'Password123!');
    await page.click('[data-testid="login-submit"]');

    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('[data-testid="user-menu"]')).toBeVisible();
  });

  test('shows error on invalid credentials', async ({ page }) => {
    await page.goto('/login');
    await page.fill('[data-testid="email-input"]', 'wrong@test.it');
    await page.fill('[data-testid="password-input"]', 'wrong');
    await page.click('[data-testid="login-submit"]');

    await expect(page.locator('[data-testid="error-message"]')).toContainText('Credenziali non valide');
  });
});
```

### Regole Testing UI

- **Usa `data-testid`** come selettori — stabili rispetto a refactoring CSS e testo.
- **Non testare i dettagli implementativi** (stato interno, metodi privati) — testa il comportamento visibile.
- **Test dei 3 stati** per ogni operazione asincrona: loading, success, error.
- I component test girano in **jsdom** (veloci, nessun browser); gli E2E girano in browser reale (lenti, usa con parsimonia).
- Esegui i component test ad ogni save (`vitest --watch`), gli E2E solo in CI.
