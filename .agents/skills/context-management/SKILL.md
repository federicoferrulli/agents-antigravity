---
name: "context-management"
description: "Guida alla Context Hygiene per mantenere l'AI precisa nelle lunghe sessioni."
category: "AI"
effort: "XS"
tags: ["context", "primer", "reset", "hygiene"]
---

# Context Management Skill (Context Hygiene)

Questa skill definisce come gestire e pulire il contesto della chat per mantenere l'AI (Antigravity) performante, precisa e libera da allucinazioni. Applicala ogni volta che senti che la conversazione sta diventando "pesante" o quando l'AI inizia a confondere i task.

## Il Contesto
Le AI hanno una "finestra di contesto" limitata. Ogni messaggio aggiunto occupa spazio e, col tempo, le prime istruzioni o dettagli critici possono essere "compressi" o ignorati. Inoltre, task multipli o errori passati possono inquinare il ragionamento dell'AI, portandola a ripetere errori o a suggerire soluzioni non più valide.

---

## Pattern 1: Segnali di "Context Pollution"

Identifica quando è il momento di un reset.

| Segnale | Sintomo | Azione |
|---|---|---|
| **Loop di Errori** | L'AI continua a fare lo stesso errore nonostante le correzioni. | `/primer` immediato |
| **Allucinazioni** | L'AI inventa file, variabili o skill che non esistono. | Reset sessione |
| **Lentezza** | La risposta impiega molto tempo o si interrompe a metà. | Sfoltimento contesto |
| **Confusione di Task** | Chiedi X e l'AI risponde citando pezzi di un task Y finito ore fa. | Clear chat + Primer |

---

## Pattern 2: Il Workflow "Primer"

Il **Primer** è la tecnica per ricaricare istantaneamente la conoscenza core in una chat pulita.

### Quando eseguirlo:
- Quando inizi un task fundamentally diverso.
- Dopo aver risolto un bug massivo che ha sporcato la logica.
- All'inizio di una nuova sessione di lavoro dopo ore di pausa.

### Come eseguirlo (Manualmente):
Se non hai il comando automatico, incolla questo prompt:
> "Svuota la tua RAM mentale. Leggi README.md, GEMINI.md e docs/rules/common.md. Siamo pronti per un nuovo task: [DESCRIZIONE TASK]."

---

## Pattern 3: Context Hygiene Best Practices

Mantenere il contesto pulito *durante* la navigazione.

### 1. Un Task alla Volta
Non mescolare feature diverse nello stesso thread. Se finisci la "Gestione Utenti" e inizi "Pagamenti", chiudi la chat e apri un thread nuovo.

### 2. Riassunto di Chiusura
Quando finisci un task complesso, chiedi all'AI:
> "Fai un riassunto tecnico di quello che abbiamo fatto e dei file modificati. Copialo in un file temporaneo /tmp/summary.md."
Questo summary sarà il tuo "punto di salvataggio" per ricaricare il contesto nel thread successivo.

### 3. Evita il "Deep Nesting" di Errori
Se provi a fixare un bug per 5-6 volte senza successo, il contesto è ormai compromesso. **Fermati**, cancella il thread, e riparti dal punto in cui il codice funzionava, spiegando il problema da zero.

---

## Pattern 4: Strumenti di "Sfoltimento"

Se non vuoi resettare tutto, chiedi all'AI di ignorare parti specifiche:
> "Ignora tutto quello che abbiamo discusso riguardo alla libreria X, d'ora in poi useremo solo la libreria Y. Dimentica i vecchi snippet di codice."

---

## Checklist di Context Reset

- [ ] L'AI è ancora allineata con l'obiettivo attuale?
- [ ] Ci sono snippet di codice obsoleti che appaiono nelle risposte?
- [ ] Ho finito un macro-task e ne sto iniziando un altro?
- [ ] La lunghezza del thread sta rendendo l'AI pigra o imprecisa?
- [ ] **Azione finale**: Se hai risposto SÌ a 2+ punti, esegui il workflow `/primer` in una nuova chat.



