const content = document.getElementById('gf-content');

// Group GF items by chain, preserving insertion order of chains
const grouped = {};
for (const item of menuData) {
    if (!grouped[item.chain]) grouped[item.chain] = [];
    if (item.glutenFree) grouped[item.chain].push(item);
}

const chains = [...new Set(menuData.map(i => i.chain))];

for (const chain of chains) {
    const items = grouped[chain] ?? [];

    const section = document.createElement('div');
    section.className = 'gf-chain-section';

    const heading = document.createElement('h2');
    heading.className = 'gf-chain-heading';
    heading.textContent = chain;
    section.appendChild(heading);

    const list = document.createElement('div');
    list.className = 'gf-items';

    if (items.length === 0) {
        const none = document.createElement('p');
        none.className = 'no-gf';
        none.textContent = 'No items without gluten-containing ingredients identified.';
        list.appendChild(none);
    } else {
        for (const item of items) {
            const row = document.createElement('div');
            row.className = 'gf-item';

            row.innerHTML = `
                <span class="gf-item-name">${item.item}</span>
                <span class="gf-badge">GF ingredients</span>
                <div class="macros">
                    ${pill(item.kcal + ' kcal', 'kcal')}
                    ${pill(item.protein + 'g', 'protein')}
                    ${pill(item.carbs + 'g', 'carbs')}
                    ${pill(item.fat + 'g', 'fat')}
                    ${pill(item.fibre + 'g', 'fibre')}
                </div>
            `;

            list.appendChild(row);
        }
    }

    section.appendChild(list);
    content.appendChild(section);
}

function pill(value, label) {
    return `<div class="macro-pill"><span class="value">${value}</span><span class="label">${label}</span></div>`;
}
