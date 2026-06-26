export function initSearching(searchField) {
    return (query, state, action) => {
        const search = String(state[searchField] ?? '').trim();

        return search
            ? Object.assign({}, query, { search })
            : query;
    };
}