# TypeScript Rules

- **Strict Typing**: Abilita `strict: true` in `tsconfig.json`. Evita l'uso di `any` in tutti gli scenari, usando `unknown` se necessario.
- **Interfaces vs Types**: Usa `interface` per definire oggetti pubblici (es. API response) ed ereditarietà. Usa `type` per unioni, intersezioni e alias.
- **Async/Await**: Preferisci `async/await` rispetto all'utilizzo diretto di Promises `.then()`. Usa `Promise.all()` per chiamate di rete parallele indipendenti.
- **Enums vs Object Literals**: Preferisci string literal union types (`type Role = 'ADMIN' | 'USER'`) o costanti ad oggetto (`const ROLES = { ADMIN: 'ADMIN' } as const`) rispetto agli `enum` classici di TypeScript, che possono introdurre codice imprevedibile in fase compilata.
- **Readonly**: Definisci le proprietà di interfaccia come `readonly` di default per forzare l'immutabilità.
