export function groupByCategory<T extends { category: string }>(
  items: T[],
  order: string[],
): { heading: string; items: T[] }[] {
  return order
    .map((heading) => ({ heading, items: items.filter((item) => item.category === heading) }))
    .filter((group) => group.items.length > 0);
}
