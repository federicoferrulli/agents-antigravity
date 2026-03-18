# Execution Workflow

Una volta che il piano è stato approvato (`[Planning](./planning.md)` completato), l'agente deve procedere con l'esecuzione.

## Step da seguire

1. **Iterazione Passo a Passo**:
   - Segui il piano alla lettera.
   - Non saltare step né accorparli senza prima riflettere sull'impatto.

2. **Applicazione delle Regole (Common Rules)**:
   - Assicurati che ogni modifica di codice rispetti `docs/rules/common.md`:
     - **Clean Architecture** (separazione delle logiche).
     - **Error Handling** esplicito e rigoroso.
     - **Immutability** delle variabili quando possibile.
     - **Naming convention** descrittive e chiare.
     - **OWASP** (attenzione alla sicurezza).

3. **Integrazione con le Skill (Es. TDD)**:
   - Se richiesto (es. implementazione di feature complessa), adotta la skill definita in `skills/tdd-workflow.md`.
   - - Scrivi prima il test (Red).
   - - Scrivi il codice minimo (Green).
   - - Esegui refactoring del codice prodotto (Refactor).

4. **Verifica Iterativa**:
   - Subito dopo ogni modifica ad un file sorgente, verifica sempre il risultato utilizzando strumenti di sola lettura (es. leggendo il file modificato, listando i file o verificando con i test).
   - Segnala al sistema o all'utente se lo step corrente del piano è completato.

**Nota bene**: Non editare file artefatti generati (come `dist/` o build finali), ma apporta modifiche solo ai file sorgenti originari.