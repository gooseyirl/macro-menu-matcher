// ── Chain checkboxes ─────────────────────────────────────────────────────────

const chains = [...new Set(menuData.map(item => item.chain))].sort();
const enabledChains = new Set(chains);

const checkboxContainer = document.getElementById('chain-checkboxes');
chains.forEach(chain => {
    const label = document.createElement('label');
    label.className = 'chain-checkbox-label checked';

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.checked = true;
    input.value = chain;

    input.addEventListener('change', () => {
        if (input.checked) {
            enabledChains.add(chain);
            label.classList.add('checked');
        } else {
            enabledChains.delete(chain);
            label.classList.remove('checked');
        }
    });

    label.appendChild(input);
    label.appendChild(document.createTextNode(chain));
    checkboxContainer.appendChild(label);
});

// ── Gluten Free toggle ────────────────────────────────────────────────────────

const gfToggle = document.getElementById('gf-toggle');
const gfDisclaimer = document.getElementById('gf-disclaimer');
let gfActive = false;

gfToggle.addEventListener('click', () => {
    gfActive = !gfActive;
    gfToggle.classList.toggle('gf-active', gfActive);
    gfDisclaimer.hidden = !gfActive;
    setGlutenFree(gfActive);
    if (gfActive) {
        const matches = applyFilters(menuData.filter(item => enabledChains.has(item.chain)));
        renderResults(matches);
    }
});

// ── Filters ───────────────────────────────────────────────────────────────────

initFilters(
    // onSearch
    () => {
        const matches = applyFilters(
            menuData.filter(item => enabledChains.has(item.chain))
        );
        renderResults(matches);
    },
    // onClear
    () => {
        checkboxContainer.querySelectorAll('input[type="checkbox"]').forEach(input => {
            input.checked = true;
            input.closest('label').classList.add('checked');
            enabledChains.add(input.value);
        });
        gfActive = false;
        gfToggle.classList.remove('gf-active');
        gfDisclaimer.hidden = true;
        document.getElementById('results').hidden = true;
    }
);

// ── Render ────────────────────────────────────────────────────────────────────

function renderResults(matches) {
    const resultsList = document.getElementById('results-list');
    const resultsHeading = document.getElementById('results-heading');
    const resultsSection = document.getElementById('results');

    resultsList.innerHTML = '';
    resultsSection.hidden = false;

    if (matches.length === 0) {
        resultsHeading.textContent = 'No matches found';
        resultsList.innerHTML = '<p class="no-results">Try adjusting your filters.</p>';
        return;
    }

    resultsHeading.textContent = `${matches.length} match${matches.length === 1 ? '' : 'es'} found`;

    const highlighted = activeFilterKeys();

    const grouped = {};
    for (const item of matches) {
        if (!grouped[item.chain]) grouped[item.chain] = [];
        grouped[item.chain].push(item);
    }

    for (const [chain, items] of Object.entries(grouped)) {
        const group = document.createElement('div');
        group.className = 'chain-group';

        const heading = document.createElement('h3');
        heading.textContent = chain;
        group.appendChild(heading);

        const itemsWrapper = document.createElement('div');
        itemsWrapper.className = 'chain-items';
        items.forEach(item => itemsWrapper.appendChild(buildResultCard(item, highlighted)));
        group.appendChild(itemsWrapper);
        resultsList.appendChild(group);
    }
}

function buildResultCard(item, highlighted) {
    const card = document.createElement('div');
    card.className = 'result-item';

    card.innerHTML = `<div class="item-name">${item.item}</div><div class="macros"></div>`;

    const macroRow = card.querySelector('.macros');
    [
        { key: 'kcal',    fmt: v => v + ' kcal' },
        { key: 'protein', fmt: v => v + 'g' },
        { key: 'carbs',   fmt: v => v + 'g' },
        { key: 'fat',     fmt: v => v + 'g' },
        { key: 'fibre',   fmt: v => v + 'g' },
    ].forEach(({ key, fmt }) => {
        const pill = document.createElement('div');
        pill.className = 'macro-pill' + (highlighted.has(key) ? ' highlighted' : '');
        pill.innerHTML = `<span class="value">${fmt(item[key])}</span><span class="label">${key}</span>`;
        macroRow.appendChild(pill);
    });

    return card;
}
