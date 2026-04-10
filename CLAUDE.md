# Antigravity Claude Code Configuration

This file provides context and instructions for **Claude Code** when working in this project.

## Project Summary
Antigravity Rule & Skill Library. Focused on Clean Architecture, DevSecOps, and AI-driven development.

## Build & Test Commands
- **Build/Update Catalog**: `npm run catalog`
- **Validate Library**: `npm run validate`
- **Create New ADR**: `npm run adr "Title"`
- **Structural Analysis**: `npm run graph:query "<question>"`
- **Rebuild Graph**: `npm run graph:build`

## Coding Standards
- **Architecture**: Always follow **Clean Architecture** principles.
- **Structural Awareness**: Before making cross-module changes, query the Graphify knowledge graph.
- **Safety**: Adhere to OWASP Top 10 security standards.
- **Rules**: Read and apply rules from `.agents/rules/common.md` and language-specific files in `.agents/rules/`.
- **Skills**: Use specialized workflows from `.agents/skills/` for complex tasks.
- **Context Hygiene**: Use `/primer` if context drifting or rule degradation occurs.

## Master Instructions
For a complete overview of mandates and golden rules, refer to **[AGENT.md](./AGENT.md)**.
