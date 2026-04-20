// filters.js — shared macro filter logic used by both pages.

const macros = ['kcal', 'protein', 'carbs', 'fat', 'fibre'];

const filterState = {};
macros.forEach(m => {
    filterState[m] = { mode: 'max', value: null };
});

function initFilters(onSearch, onClear) {
    const searchBtn = document.getElementById('search-btn');

    function updateSearchBtn() {
        searchBtn.disabled = !macros.some(m => filterState[m].value !== null);
    }

    function updateSliderFill(slider) {
        const pct = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
        slider.style.setProperty('--fill', pct + '%');
        slider.classList.add('fill-left');
    }

    // Wire each filter card
    document.querySelectorAll('.filter-card').forEach(card => {
        const macro = card.dataset.macro;
        const slider = card.querySelector('.slider');
        const valueLabel = card.querySelector('.slider-value');
        const modeBtns = card.querySelectorAll('.mode-btn');
        const unit = macro === 'kcal' ? ' kcal' : 'g';

        modeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                modeBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                filterState[macro].mode = btn.dataset.mode;
            });
        });

        slider.addEventListener('input', () => {
            const val = parseInt(slider.value, 10);
            const atMin = val === parseInt(slider.min, 10);
            filterState[macro].value = atMin ? null : val;
            valueLabel.textContent = val + unit;
            card.classList.toggle('active', !atMin);
            updateSliderFill(slider);
            updateSearchBtn();
        });

        updateSliderFill(slider);
    });

    // Submit
    document.getElementById('macro-form').addEventListener('submit', e => {
        e.preventDefault();
        if (macros.some(m => filterState[m].value !== null)) onSearch();
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
            modeBtns.forEach((b, i) => b.classList.toggle('active', i === 1));
            filterState[macro] = { mode: 'max', value: null };
        });

        updateSearchBtn();
        if (onClear) onClear();
    });

    updateSearchBtn();
}

function applyFilters(items) {
    return items.filter(item =>
        macros.every(m => {
            const { mode, value } = filterState[m];
            if (value === null) return true;
            return mode === 'min' ? item[m] >= value : item[m] <= value;
        })
    );
}

function activeFilterKeys() {
    return new Set(macros.filter(m => filterState[m].value !== null));
}
