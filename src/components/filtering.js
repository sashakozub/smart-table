export function initFiltering(elements, indexes) {
    Object.keys(indexes).forEach((elementName) => {
        elements[elementName].append(
            ...Object.values(indexes[elementName]).map(name => {
                const option = document.createElement('option');

                option.value = name;
                option.textContent = name;

                return option;
            })
        );
    });

    return (data, state, action) => {
        if (action && action.name === 'clear') {
            const field = action.dataset.field;
            const input = action.parentElement.querySelector('input');

            input.value = '';
            state[field] = '';
        }

        return data.filter(row => {
            const date = String(state.date ?? '').toLowerCase();
            const customer = String(state.customer ?? '').toLowerCase();
            const seller = String(state.seller ?? '');
            const totalFrom = parseFloat(state.totalFrom);
            const totalTo = parseFloat(state.totalTo);
            const total = parseFloat(row.total);

            if (date && !String(row.date).toLowerCase().includes(date)) {
                return false;
            }

            if (customer && !String(row.customer).toLowerCase().includes(customer)) {
                return false;
            }

            if (seller && row.seller !== seller) {
                return false;
            }

            if (!Number.isNaN(totalFrom) && total < totalFrom) {
                return false;
            }

            if (!Number.isNaN(totalTo) && total > totalTo) {
                return false;
            }

            return true;
        });
    }
}