---
description: AutoResearch Workflow
---

# Autonomous Iteration Workflow

## Phase 1: Environment Definition
- **Mutable Component (`algorithm.ext`)**: The isolated file containing the logic to be optimized. The agent has exclusive read/write access to this file.
- **Evaluation Component (`eval.ext`)**: The deterministic testing environment. The agent has strictly read-only access. Execution must output a singular, parsable numeric metric.

## Phase 2: Agent Directives
- **Primary Objective**: Maximize (or minimize, depending on the goal) the scalar output of `eval.ext`.
- **System Constraint**: Modifications are strictly limited to `algorithm.ext`. Contextual changes to the test suite, dependencies, or evaluation parameters are prohibited.

## Phase 3: Execution Loop
1. **Mutation**: Analyze prior iteration data and generate a logic permutation strictly within `algorithm.ext`.
2. **Execution**: Trigger the evaluation script (`eval.ext`) via automated terminal command.
3. **Parsing**: Extract the resulting metric from standard output.
4. **State Resolution**:
   - **Success Condition**: If Current Metric > Baseline Metric -> Commit file state, update baseline metric.
   - **Failure Condition**: If Current Metric <= Baseline Metric -> Execute state-rollback, reverting `algorithm.ext` to the previous configuration.
5. **Recursion**: Loop sequence beginning at Step 1 until the target metric threshold is achieved or the defined iteration limit is reached.