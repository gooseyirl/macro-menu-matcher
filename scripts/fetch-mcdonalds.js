// fetch-mcdonalds.js
// ─────────────────────────────────────────────────────────────────────────────
// Browser console script — paste into Chrome/Firefox DevTools console while on:
//   https://www.mcdonalds.com/ie/en-ie/good-to-know/nutrition-calculator.html
//
// It will fetch nutrition data for every menu item and download a file called
// mcdonalds-raw.json. Run build-mcdonalds-data.js next to convert it to data.js.
// ─────────────────────────────────────────────────────────────────────────────

(async () => {
    // ── 1. Read embedded product catalogue ──────────────────────────────────
    const el = document.querySelector('[data-product-collection-api]');
    if (!el) { console.error('Could not find nutrition calculator element. Are you on the right page?'); return; }

    const rawData = el.dataset.productData;
    const catalogue = JSON.parse(rawData);

    // Build a map of categoryTitle → [productId]
    const categoryMap = {};
    const allIds = new Set();
    for (const cat of catalogue.categoryList) {
        categoryMap[cat.title] = cat.productId;
        cat.productId.forEach(id => allIds.add(id));
    }

    const country  = el.dataset.country || 'ie';
    const language = el.dataset.siteLanguage || 'en';
    const apiBase  = el.dataset.productApiUrl || '/dnaapp/itemDetails';

    console.log(`Found ${allIds.size} unique products across ${catalogue.categoryList.length} categories.`);

    // ── 2. Fetch nutrition for each product ──────────────────────────────────
    // Nutrient field IDs (from McDonald's schema):
    // 1=Energy kJ  2=Energy kcal  3=Protein  4=Carbohydrates  5=Sugars
    // 6=Fat  7=Saturated fat  8=Fibre  9=Salt

    const results = [];
    const ids = [...allIds];

    for (let i = 0; i < ids.length; i++) {
        const id = ids[i];
        process.stdout && process.stdout.write(`Fetching ${i + 1}/${ids.length}: ${id}\r`);
        console.log(`Fetching ${i + 1}/${ids.length}: product ${id}`);

        try {
            const url = `${apiBase}?country=${country}&language=${language}&productId=${id}`;
            const res = await fetch(url, {
                headers: { 'Accept': 'application/json' }
            });

            if (!res.ok) {
                console.warn(`  ✗ ${id}: HTTP ${res.status}`);
                continue;
            }

            const json = await res.json();

            // Find which categories this item belongs to
            const itemCategories = [];
            for (const [catName, catIds] of Object.entries(categoryMap)) {
                if (catIds.includes(id)) itemCategories.push(catName);
            }

            results.push({ id, categories: itemCategories, raw: json });
        } catch (err) {
            console.warn(`  ✗ ${id}: ${err.message}`);
        }

        // Small delay to be polite
        await new Promise(r => setTimeout(r, 150));
    }

    console.log(`\nDone. Fetched ${results.length}/${ids.length} items.`);

    // ── 3. Download as JSON ──────────────────────────────────────────────────
    const blob = new Blob([JSON.stringify(results, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'mcdonalds-raw.json';
    a.click();
    console.log('Downloaded mcdonalds-raw.json — now run: node scripts/build-mcdonalds-data.js');
})();
