---
description: 
---

# Planning Workflow

La fase di pianificazione è cruciale per garantire che il codice sviluppato risponda esattamente ai requisiti e aderisca agli standard del progetto.

## Step da seguire

1. **Analisi della Richiesta**:
   - Leggi attentamente la richiesta dell'utente.
   - Identifica i requisiti funzionali e non funzionali.
   - Se la richiesta è ambigua, poni domande di chiarimento.

2. **Esplorazione del Codebase**:
   - Usa gli strumenti di esplorazione (es. letture di directory o file) per capire dove effettuare i cambiamenti.
   - Esamina `README.md`, file di configurazione e `AGENTS.md` (se presente) per le istruzioni di contesto.

3. **Verifica delle Regole e Skill**:
   - Leggi `docs/rules/common.md`.
   - Se necessario per il task (es. TDD o testing specifico), leggi in `skills/` (es. `skills/tdd-workflow.md`).

4. **Creazione del Piano d'Azione**:
   - Sviluppa un piano in formato Markdown. Deve essere diviso in step enumerati, ciascuno focalizzato su un'azione chiara.
   - Assicurati di includere uno step dedicato per il verifiche.
   - Quando il piano è pronto, sottomettilo (se applicabile con lo strumento `set_plan` o richiedendo revisione tramite `request_plan_review`).

**Non procedere all'esecuzione finché il piano non è chiaro o approvato.**