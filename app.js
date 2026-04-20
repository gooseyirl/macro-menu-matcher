const form = document.getElementById('macro-form');
const resultsSection = document.getElementById('results');
const resultsHeading = document.getElementById('results-heading');
const resultsList = document.getElementById('results-list');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    runSearch();
});

form.addEventListener('reset', function () {
    resultsSection.hidden = true;
});

function getNum(id) {
    const val = document.getElementById(id).value.trim();
    return val === '' ? null : parseFloat(val);
}

function inRange(value, min, max) {
    if (min !== null && value < min) return false;
    if (max !== null && value > max) return false;
    return true;
}

function runSearch() {
    const filters = {
        kcal:    { min: getNum('kcal-min'),    max: getNum('kcal-max')    },
        protein: { min: getNum('protein-min'), max: getNum('protein-max') },
        carbs:   { min: getNum('carbs-min'),   max: getNum('carbs-max')   },
        fat:     { min: getNum('fat-min'),     max: getNum('fat-max')     },
        fibre:   { min: getNum('fibre-min'),   max: getNum('fibre-max')   },
    };

    const hasFilter = Object.values(filters).some(f => f.min !== null || f.max !== null);
    if (!hasFilter) {
        showMessage('Enter at least one value to filter by.');
        return;
    }

    const matches = menuData.filter(item =>
        inRange(item.kcal,    filters.kcal.min,    filters.kcal.max)    &&
        inRange(item.protein, filters.protein.min, filters.protein.max) &&
        inRange(item.carbs,   filters.carbs.min,   filters.carbs.max)   &&
        inRange(item.fat,     filters.fat.min,     filters.fat.max)     &&
        inRange(item.fibre,   filters.fibre.min,   filters.fibre.max)
    );

    renderResults(matches);
}

function renderResults(matches) {
    resultsList.innerHTML = '';
    resultsSection.hidden = false;

    if (matches.length === 0) {
        resultsHeading.textContent = 'No matches found';
        resultsList.innerHTML = '<p class="no-results">Try widening your ranges.</p>';
        return;
    }

    resultsHeading.textContent = `${matches.length} match${matches.length === 1 ? '' : 'es'} found`;

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

        for (const item of items) {
            group.appendChild(buildResultCard(item));
        }

        resultsList.appendChild(group);
    }
}

function buildResultCard(item) {
    const card = document.createElement('div');
    card.className = 'result-item';

    card.innerHTML = `
        <div class="item-name">${item.item}</div>
        <div class="macros">
            ${macroPill(item.kcal, 'kcal')}
            ${macroPill(item.protein + 'g', 'protein')}
            ${macroPill(item.carbs + 'g', 'carbs')}
            ${macroPill(item.fat + 'g', 'fat')}
            ${macroPill(item.fibre + 'g', 'fibre')}
        </div>
    `;

    return card;
}

function macroPill(value, label) {
    return `<div class="macro-pill"><span class="value">${value}</span><span class="label">${label}</span></div>`;
}

function showMessage(msg) {
    resultsList.innerHTML = `<p class="no-results">${msg}</p>`;
    resultsHeading.textContent = '';
    resultsSection.hidden = false;
}
