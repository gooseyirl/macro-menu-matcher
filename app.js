// State: one entry per macro
const macros = ['kcal', 'protein', 'carbs', 'fat', 'fibre'];

const state = {};
macros.forEach(m => {
    state[m] = { mode: 'min', value: null };
});

// ── Chain checkboxes (all checked by default) ────────────────────────────────

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

// ── Search button ────────────────────────────────────────────────────────────

const searchBtn = document.getElementById('search-btn');

function updateSearchBtn() {
    const hasFilter = macros.some(m => state[m].value !== null);
    searchBtn.disabled = !hasFilter;
}

// Wire up each filter card
document.querySelectorAll('.filter-card').forEach(card => {
    const macro = card.dataset.macro;
    const slider = card.querySelector('.slider');
    const valueLabel = card.querySelector('.slider-value');
    const modeBtns = card.querySelectorAll('.mode-btn');
    const unit = macro === 'kcal' ? ' kcal' : 'g';

    // Mode toggle
    modeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state[macro].mode = btn.dataset.mode;
        });
    });

    // Slider
    slider.addEventListener('input', () => {
        const val = parseInt(slider.value, 10);
        const atMin = val === parseInt(slider.min, 10);

        state[macro].value = atMin ? null : val;
        valueLabel.textContent = val + unit;
        card.classList.toggle('active', !atMin);
        updateSliderFill(slider);
        updateSearchBtn();
    });

    // Initialise fill on load
    updateSliderFill(slider);
});

function updateSliderFill(slider) {
    const min = parseInt(slider.min, 10);
    const max = parseInt(slider.max, 10);
    const val = parseInt(slider.value, 10);
    const pct = ((val - min) / (max - min)) * 100;
    slider.style.setProperty('--fill', pct + '%');
    slider.classList.add('fill-left');
}

// Form submit
document.getElementById('macro-form').addEventListener('submit', e => {
    e.preventDefault();
    runSearch();
});

// Clear
document.getElementById('clear-btn').addEventListener('click', () => {
    document.querySelectorAll('.filter-card').forEach(card => {
        const macro = card.dataset.macro;
        const slider = card.querySelector('.slider');
        const valueLabel = card.querySelector('.slider-value');
        const modeBtns = card.querySelectorAll('.mode-btn');

        const unit = macro === 'kcal' ? ' kcal' : 'g';
        slider.value = slider.min;
        valueLabel.textContent = '0' + unit;
        card.classList.remove('active');
        updateSliderFill(slider);

        modeBtns.forEach((b, i) => b.classList.toggle('active', i === 0));
        state[macro] = { mode: 'min', value: null };
    });

    // Re-check all chains
    checkboxContainer.querySelectorAll('input[type="checkbox"]').forEach(input => {
        input.checked = true;
        input.closest('label').classList.add('checked');
        enabledChains.add(input.value);
    });

    document.getElementById('results').hidden = true;
    updateSearchBtn();
});

function runSearch() {
    const hasFilter = macros.some(m => state[m].value !== null);
    if (!hasFilter) {
        showMessage('Move at least one slider to filter.');
        return;
    }

    const matches = menuData.filter(item => {
        if (!enabledChains.has(item.chain)) return false;
        return macros.every(m => {
            const { mode, value } = state[m];
            if (value === null) return true;
            if (mode === 'min') return item[m] >= value;
            if (mode === 'max') return item[m] <= value;
            return true;
        });
    });

    renderResults(matches);
}

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

    // Determine which macros are actively filtered (for highlighting)
    const activeFilters = new Set(macros.filter(m => state[m].value !== null));

    // Group by chain
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

        for (const item of items) {
            itemsWrapper.appendChild(buildResultCard(item, activeFilters));
        }

        group.appendChild(itemsWrapper);
        resultsList.appendChild(group);
    }
}

function buildResultCard(item, activeFilters) {
    const card = document.createElement('div');
    card.className = 'result-item';

    const name = document.createElement('div');
    name.className = 'item-name';
    name.textContent = item.item;
    card.appendChild(name);

    const macroRow = document.createElement('div');
    macroRow.className = 'macros';

    const pillDefs = [
        { key: 'kcal',    label: 'kcal',    format: v => v + ' kcal' },
        { key: 'protein', label: 'protein',  format: v => v + 'g' },
        { key: 'carbs',   label: 'carbs',    format: v => v + 'g' },
        { key: 'fat',     label: 'fat',      format: v => v + 'g' },
        { key: 'fibre',   label: 'fibre',    format: v => v + 'g' },
    ];

    for (const { key, label, format } of pillDefs) {
        const pill = document.createElement('div');
        pill.className = 'macro-pill' + (activeFilters.has(key) ? ' highlighted' : '');

        pill.innerHTML = `
            <span class="value">${format(item[key])}</span>
            <span class="label">${label}</span>
        `;
        macroRow.appendChild(pill);
    }

    card.appendChild(macroRow);
    return card;
}

function showMessage(msg) {
    const resultsList = document.getElementById('results-list');
    const resultsHeading = document.getElementById('results-heading');
    const resultsSection = document.getElementById('results');

    resultsList.innerHTML = `<p class="no-results">${msg}</p>`;
    resultsHeading.textContent = '';
    resultsSection.hidden = false;
}
