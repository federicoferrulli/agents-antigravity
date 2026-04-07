const fs = require('fs');
const path = require('path');

/**
 * Valuta la qualità di un file Markdown per Antigravity.
 * Restituisce un punteggio numerico (0-100).
 */
function evaluate(filePath) {
    if (!fs.existsSync(filePath)) return 0;
    const content = fs.readFileSync(filePath, 'utf-8').replace(/\r\n/g, '\n');
    let score = 0;

    // 1. YAML Frontmatter (35 punti totali)
    const hasFrontmatter = /^---\n([\s\S]*?)\n---\n/.test(content);
    if (hasFrontmatter) {
        score += 20;
        const frontmatter = content.match(/^---\n([\s\S]*?)\n---\n/)[1];
        if (frontmatter.includes('title:')) score += 5;
        if (frontmatter.includes('description:')) score += 5;
        if (frontmatter.includes('tags:')) score += 5;
    }

    // 2. Struttura H1 (10 punti)
    if (/^# .+/m.test(content)) score += 10;

    // 3. Esempi di codice (20 punti)
    const codeBlocks = (content.match(/```[\s\S]*?```/g) || []).length;
    if (codeBlocks >= 1) score += 10;
    if (codeBlocks >= 3) score += 10;

    // 4. Lunghezza e profondità (20 punti)
    const lines = content.split('\n').filter(l => l.trim().length > 0).length;
    if (lines > 30) score += 10;
    if (lines > 60) score += 10;

    // 5. Mermaid diagrams (10 punti)
    if (content.includes('```mermaid')) score += 10;

    // 6. Alert tags (e.g., > [!NOTE], > [!IMPORTANT]) (5 punti)
    if (/> \[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]/.test(content)) score += 5;

    return Math.min(score, 100);
}

const targetFile = process.argv[2];
if (!targetFile) {
    console.error('Usage: node evaluate-md-quality.js <file-path>');
    process.exit(1);
}

const score = evaluate(targetFile);
console.log(score);
