# Data Update Scripts

## Updating McDonald's nutritional data

McDonald's Ireland nutrition data is fetched directly from their website using a two-step process. The API requires a real browser session, so step 1 runs inside Chrome DevTools.

### Step 1 — Fetch raw data in your browser

1. Open Chrome and go to:
   `https://www.mcdonalds.com/ie/en-ie/good-to-know/nutrition-calculator.html`

2. Open DevTools: **⌥ + ⌘ + J** (Mac) or **F12 → Console tab**

3. Copy the entire contents of `fetch-mcdonalds.js` and paste it into the console, then press Enter

4. Wait for it to finish — it will log progress for each item (~123 items, takes ~30 seconds)

5. A file called `mcdonalds-raw.json` will download automatically

6. Move it into this `scripts/` folder:
   ```bash
   mv ~/Downloads/mcdonalds-raw.json scripts/
   ```

### Step 2 — Convert and update data.js

```bash
node scripts/build-mcdonalds-data.js --write
```

This reads `scripts/mcdonalds-raw.json`, extracts kcal/protein/carbs/fat/fibre for each item, and updates the McDonald's section of `data.js` in place. All other chains are left untouched.

To preview without writing:
```bash
node scripts/build-mcdonalds-data.js
```

### Commit the update

```bash
git add data.js scripts/mcdonalds-raw.json
git commit -m "[Data] Update McDonald's Ireland nutrition data"
```
