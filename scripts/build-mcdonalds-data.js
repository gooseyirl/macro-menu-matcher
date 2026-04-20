#!/usr/bin/env node
// build-mcdonalds-data.js
// ─────────────────────────────────────────────────────────────────────────────
// Converts mcdonalds-raw.json (downloaded by fetch-mcdonalds.js) into the
// McDonald's section of data.js.
//
// Usage:
//   node scripts/build-mcdonalds-data.js [path/to/mcdonalds-raw.json]
//
// Output:
//   Prints the updated data.js to stdout, replacing the McDonald's section.
//   Redirect to overwrite: node scripts/build-mcdonalds-data.js > data.js
//   (or let it update data.js in place — see --write flag below)
//
// Flags:
//   --write   Overwrite data.js in place (keeps all other chains intact)
//   --dry-run Just print the generated McDonald's entries (default)
// ─────────────────────────────────────────────────────────────────────────────

const fs   = require('fs');
const path = require('path');

// ── Nutrient field ID → key mapping ─────────────────────────────────────────
// McDonald's uses numeric IDs for each nutrient in their API response.
const NUTRIENT_IDS = {
    kcal:    '208',   // Energy kcal  (common USDA/McDonald's ID)
    protein: '203',   // Protein
    carbs:   '205',   // Carbohydrates
    fat:     '204',   // Total Fat
    fibre:   '291',   // Dietary Fibre
};

// Fallback: some McDonald's markets use a simpler sequential scheme
const NUTRIENT_IDS_ALT = {
    kcal:    '2',
    protein: '3',
    carbs:   '4',
    fat:     '6',
    fibre:   '8',
};

// ── Helpers ──────────────────────────────────────────────────────────────────

function findNutrient(nutrients, primaryId, altId) {
    if (!Array.isArray(nutrients)) return null;
    let hit = nutrients.find(n => String(n.id || n.nutrientId || n.nutrient_id) === primaryId);
    if (!hit && altId) {
        hit = nutrients.find(n => String(n.id || n.nutrientId || n.nutrient_id) === altId);
    }
    if (!hit) return null;
    const val = parseFloat(hit.value || hit.per100g || hit.amount || 0);
    return isNaN(val) ? null : Math.round(val * 10) / 10;
}

function extractNutrition(raw) {
    // McDonald's API response shape varies slightly — handle a few structures
    const item = raw?.item ?? raw?.items?.[0] ?? raw;

    // Try nested nutrientFacts / nutrients array
    const nutrients =
        item?.nutrientFacts ??
        item?.nutrients ??
        item?.servingInfo?.nutrients ??
        item?.nutrition?.nutrients ??
        null;

    if (!Array.isArray(nutrients)) return null;

    return {
        kcal:    findNutrient(nutrients, NUTRIENT_IDS.kcal,    NUTRIENT_IDS_ALT.kcal),
        protein: findNutrient(nutrients, NUTRIENT_IDS.protein, NUTRIENT_IDS_ALT.protein),
        carbs:   findNutrient(nutrients, NUTRIENT_IDS.carbs,   NUTRIENT_IDS_ALT.carbs),
        fat:     findNutrient(nutrients, NUTRIENT_IDS.fat,     NUTRIENT_IDS_ALT.fat),
        fibre:   findNutrient(nutrients, NUTRIENT_IDS.fibre,   NUTRIENT_IDS_ALT.fibre),
    };
}

function extractName(raw) {
    const item = raw?.item ?? raw?.items?.[0] ?? raw;
    return (
        item?.item_name ??
        item?.name ??
        item?.itemName ??
        item?.title ??
        null
    );
}

// ── Main ─────────────────────────────────────────────────────────────────────

const args      = process.argv.slice(2);
const writeMode = args.includes('--write');
const rawPath   = args.find(a => !a.startsWith('--')) ?? 'mcdonalds-raw.json';

if (!fs.existsSync(rawPath)) {
    console.error(`Error: cannot find ${rawPath}`);
    console.error('Run fetch-mcdonalds.js in your browser first to download mcdonalds-raw.json.');
    process.exit(1);
}

const rawItems = JSON.parse(fs.readFileSync(rawPath, 'utf8'));
console.error(`Processing ${rawItems.length} items from ${rawPath}...`);

// Inspect the first item's structure to help with debugging
if (rawItems.length > 0) {
    console.error('\nFirst item structure (top-level keys of raw):');
    console.error(Object.keys(rawItems[0].raw || {}).join(', '));
}

const entries = [];
const skipped = [];

for (const { id, categories, raw } of rawItems) {
    const name = extractName(raw);
    const nutrition = extractNutrition(raw);

    if (!name) {
        skipped.push(`${id}: could not extract name`);
        continue;
    }

    if (!nutrition || Object.values(nutrition).every(v => v === null)) {
        skipped.push(`${id} (${name}): could not extract nutrition`);
        continue;
    }

    entries.push({ name, nutrition, categories });
}

if (skipped.length) {
    console.error(`\nSkipped ${skipped.length} items:`);
    skipped.forEach(s => console.error('  ' + s));
}

// ── Generate the McDonald's JS block ─────────────────────────────────────────

const lines = [
    `    // ── McDonald's ───────────────────────────────────────────────────────────`,
    `    // Source: McDonald's Ireland Nutrition Calculator (auto-generated ${new Date().toISOString().slice(0, 10)})`,
    `    // Re-generate: run scripts/fetch-mcdonalds.js in browser, then node scripts/build-mcdonalds-data.js --write`,
];

for (const { name, nutrition } of entries) {
    const { kcal, protein, carbs, fat, fibre } = nutrition;
    const pad = ' '.repeat(Math.max(0, 40 - name.length));
    lines.push(
        `    { chain: "McDonald's", item: "${name}",${pad}` +
        `kcal: ${kcal ?? 'null'}, protein: ${protein ?? 'null'}, carbs: ${carbs ?? 'null'}, fat: ${fat ?? 'null'}, fibre: ${fibre ?? 'null'} },`
    );
}

const mcBlock = lines.join('\n');

if (!writeMode) {
    console.log('\n// ── GENERATED McDONALDS BLOCK ──\n');
    console.log(mcBlock);
    console.log('\n// Re-run with --write to update data.js in place.');
    process.exit(0);
}

// ── Write mode: update data.js ───────────────────────────────────────────────

const dataJsPath = path.resolve(__dirname, '..', 'data.js');
if (!fs.existsSync(dataJsPath)) {
    console.error(`Error: data.js not found at ${dataJsPath}`);
    process.exit(1);
}

const original = fs.readFileSync(dataJsPath, 'utf8');

// Replace everything between the McDonald's start marker and the next chain marker
const startMarker = /    \/\/ ── McDonald's ─+\n/;
const nextChain   = /\n    \/\/ ── (?!McDonald)/;

const startIdx = original.search(startMarker);
if (startIdx === -1) {
    console.error("Could not find McDonald's section marker in data.js.");
    console.error("Make sure data.js contains:  // ── McDonald's ──...");
    process.exit(1);
}

const afterStart = original.slice(startIdx);
const nextMatch  = afterStart.search(nextChain);
const endIdx     = nextMatch === -1 ? original.length : startIdx + nextMatch;

const updated = original.slice(0, startIdx) + mcBlock + '\n' + original.slice(endIdx);
fs.writeFileSync(dataJsPath, updated, 'utf8');

console.error(`\n✓ data.js updated with ${entries.length} McDonald's items.`);
