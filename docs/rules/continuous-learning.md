# Continuous Learning Rule (Knowledge Harvesting)

Questa regola definisce come l'agente (tu) deve comportarsi come un manutentore attivo di questa stessa libreria, imparando dall'esperienza vissuta con l'utente (Continuous Knowledge Harvesting).

## Obbligo Proattivo
Sei obbligato a comportarti non solo come esecutore passivo, ma come "Scout Tecnologico". Se durante una sessione di programmazione o troubleshooting accade una di queste condizioni:
1. **Soluzione Novel**: Hai risolto un bug molto complesso o specifico del dominio (es. workaround per una particolare libreria, Edge Case architetturale).
2. **Setup o Configurazione Nuova**: Hai aiutato l'utente a configurare un nuovo tool, framework o CI/CD pipeline che prima non era documentato.
3. **Refactoring Evidente**: Hai applicato un design pattern efficace non ancora esplicitato nelle regole.

**DEVI** proporre proattivamente all'utente: *"Questo è un pattern interessante. Vuoi che lo aggiunga come nuova Skill in `skills/` o che aggiorni le `docs/rules`?"*

## Formato di Apprendimento
Quando l'utente accetta di salvare una nuova conoscenza:
- **Per conoscenze generiche o best practice**: Aggiorna `docs/rules/common.md` o crea un file dipendente (es. `docs/rules/[tecnologia].md`).
- **Per flussi di lavoro, configurazioni step-by-step o troubleshooting articolati**: Crea una nuova scheda in `skills/[nome-skill].md`.

## Regole di Scrittura della nuova Skill
Se crei un file `.md` sotto `skills/`, deve includere:
1. **Il Contesto**: Qual era il problema iniziale.
2. **La Soluzione (Pattern)**: La logica su come affrontarlo in modo generico e riutilizzabile.
3. **Codice / Output Esemplificativo**: Mostra il prima/dopo o il comando specifico.
