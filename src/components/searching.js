export function initSearching(searchField) {
    return (data, state, action) => {
        const value = String(state[searchField] ?? '').trim().toLowerCase();

        if (!value) {
            return data;
        }

        return data.filter(row => {
            return ['date', 'customer', 'seller'].some(field => {
                return String(row[field]).toLowerCase().includes(value);
            });
        });
    }
}