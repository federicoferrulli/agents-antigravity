# Security Standards (OWASP)

Queste regole si applicano a tutto il codice generato per garantire un base level di sicurezza:

1. **Input Validation**: Valida rigorosamente *tutti* gli input dell'utente sul lato server. Usa schemi di convalida (es. Zod, Joi). Non fidarti mai dell'input del client.
2. **Authentication & Authorization**:
   - Non implementare logica di autenticazione home-made se non assolutamente necessario; preferisci librerie standard o servizi gestiti.
   - Applica il principio del minimo privilegio (Least Privilege).
3. **Senstive Data Exposure**:
   - Assicurati che i segreti (API keys, password, token) non vengano **mai** commitati nel codice (usa `.env`).
   - Usa hashing forte (es. Argon2, bcrypt) per memorizzare password.
4. **Injection Prevention**: Utilizza ORM, query parametrizzate o string escape system standard per proteggerti da SQL injection, NoSQL injection o Command Injection.
5. **Cross-Site Scripting (XSS)**: Escapa o sanitizza sempre i dati inviati al client, specialmente in framework che non lo fanno automaticamente.
