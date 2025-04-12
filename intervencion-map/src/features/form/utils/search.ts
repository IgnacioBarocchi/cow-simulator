export const getSearchFn = (search: string) => (o: string) =>
    o.toLowerCase().startsWith(search.toLowerCase());
