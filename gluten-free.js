const gfItems = menuData.filter(item => item.glutenFree);
const chains = [...new Set(menuData.map(i => i.chain))];

function renderGF(items) {
    const content = document.getElementById('gf-content');
    content.innerHTML = '';

    const grouped = {};
    chains.forEach(c => { grouped[c] = []; });
    items.forEach(item => grouped[item.chain].push(item));

    const highlighted = activeFilterKeys();

    chains.forEach(chain => {
        const section = document.createElement('div');
        section.className = 'gf-chain-section';

        const heading = document.createElement('h2');
        heading.className = 'gf-chain-heading';
        heading.textContent = chain;
        section.appendChild(heading);

        const list = document.createElement('div');
        list.className = 'gf-items';

        if (grouped[chain].length === 0) {
            const none = document.createElement('p');
            none.className = 'no-gf';
            none.textContent = 'No matching items.';
            list.appendChild(none);
        } else {
            grouped[chain].forEach(item => {
                const row = document.createElement('div');
                row.className = 'gf-item';

                const name = document.createElement('span');
                name.className = 'gf-item-name';
                name.textContent = item.item;

                const badge = document.createElement('span');
                badge.className = 'gf-badge';
                badge.textContent = 'GF ingredients';

                const macroRow = document.createElement('div');
                macroRow.className = 'macros';

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

                row.appendChild(name);
                row.appendChild(badge);
                row.appendChild(macroRow);
                list.appendChild(row);
            });
        }

        section.appendChild(list);
        content.appendChild(section);
    });
}

// Initial render — show all GF items
renderGF(gfItems);

// Wire filters
initFilters(
    // onSearch
    () => renderGF(applyFilters(gfItems)),
    // onClear
    () => renderGF(gfItems)
);
