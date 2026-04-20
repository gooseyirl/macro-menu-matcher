# Macro Menu Matcher

A static site (GitHub Pages) for filtering fast food menu items by nutritional macros — calories, protein, carbohydrates, fat, and fibre.

- **Main page**: Filter across all restaurants with Min/Max sliders per macro and restaurant checkboxes
- **Gluten-free page**: Browse and filter items made without gluten-containing ingredients

---

## Data format

All menu data lives in `data.js` as a single `menuData` array:

```js
const menuData = [
  {
    chain: "McDonald's",
    item: "Big Mac",
    kcal: 508,
    protein: 27,
    carbs: 45,
    fat: 25,
    fibre: 3,
    glutenFree: false
  },
  // ...
];
```

| Field | Type | Unit | Notes |
|---|---|---|---|
| `chain` | string | — | Restaurant name, must be consistent across items |
| `item` | string | — | Menu item name |
| `kcal` | number | kcal | Energy |
| `protein` | number | g | Protein |
| `carbs` | number | g | Total carbohydrates |
| `fat` | number | g | Total fat |
| `fibre` | number | g | Dietary fibre |
| `glutenFree` | boolean | — | `true` if made without gluten-containing ingredients per official allergen info |

**Note on `glutenFree`**: This flag means the item contains no gluten ingredients according to the chain's allergen data. It does **not** mean certified gluten-free — cross-contamination from shared kitchens is possible. See the disclaimer on the gluten-free page.

---

## Refreshing nutritional data

### McDonald's (semi-automated)

McDonald's uses Akamai bot protection, so their API cannot be called from scripts directly. Use the browser console approach:

**Step 1 — Fetch raw data (in-browser)**

1. Open [mcdonalds.com/ie/en-ie/eat/nutrition-calculator.html](https://www.mcdonalds.com/ie/en-ie/eat/nutrition-calculator.html) in Chrome
2. Open DevTools → Console
3. Paste and run `scripts/fetch-mcdonalds.js`
4. The script downloads `mcdonalds-raw.json` to your Downloads folder

**Step 2 — Convert and update `data.js`**

```bash
node scripts/build-mcdonalds-data.js                  # dry-run preview
node scripts/build-mcdonalds-data.js --write          # overwrite data.js
```

---

### All other restaurants (manual)

For each restaurant, visit their nutrition page, find the items currently in `data.js`, and update the values. Add any notable new items.

| Restaurant | Nutrition page |
|---|---|
| Burger King | https://www.burgerking.ie/nutrition |
| Domino's | https://www.dominos.ie/pages/nutrition |
| Five Guys | https://www.fiveguys.co.uk/nutritional-information |
| KFC | https://www.kfc.ie/nutrition |
| Leon | https://leon.co/nutrition |
| Nando's | https://www.nandos.ie/food/nutrition |
| Pret a Manger | https://www.pret.com/en-IE/nutritional-information |
| Shake Shack | https://www.shakeshack.com/nutrition |
| Subway | https://www.subway.com/en-IE |
| Supermac's | https://www.supermacs.ie/nutrition |

**Manual update process:**

1. Visit the nutrition page for the restaurant
2. Find each item listed for that chain in `data.js`
3. Update `kcal`, `protein`, `carbs`, `fat`, `fibre` to match current values
4. Check allergen info and update `glutenFree` if needed
5. Add any significant new menu items

---

## Adding a new restaurant

1. Visit the restaurant's official nutrition/allergen page
2. Add entries to `data.js` — keep the chain name consistent across all items
3. Add the restaurant to the table above in this README
4. If the chain has a scriptable API, consider adding a fetch script under `scripts/`
5. Bump the version in `version.js` (minor bump for new restaurant, patch for data corrections)

---

## Versioning

Version is set in `version.js` and displayed in the footer of both pages.

| Change | Version bump |
|---|---|
| Data correction / bug fix | Patch (`1.x.x → 1.x.(x+1)`) |
| New restaurant / new feature | Minor (`1.x.x → 1.(x+1).0`) |
| Major redesign | Major (`1.x.x → 2.0.0`) |

---

## Project structure

```
macro-menu-matcher/
├── index.html          # Main macro filter page
├── gluten-free.html    # Gluten-free reference page
├── style.css           # Shared styles
├── data.js             # All menu data
├── filters.js          # Shared slider/filter logic
├── app.js              # Main page JS
├── gluten-free.js      # Gluten-free page JS
├── version.js          # Version string
└── scripts/
    ├── fetch-mcdonalds.js        # Browser console script — downloads raw McDonald's data
    └── build-mcdonalds-data.js   # Node.js — converts raw JSON, updates data.js
```
