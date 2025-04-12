export const filterAvenuesByNeighborhood = (
  data: any,
  neighborhood: string
) => {
  if (!data?.features) return [];

  const filtered = data.features
    .filter((f) => f.properties.BARRIO === neighborhood)
    .map((f) => f.properties.nomoficial);

  return [...new Set(filtered)];
};
