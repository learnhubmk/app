export interface Item {
  id: number;
  name: string;
}

export const fetchItems = async (
  page: number,
  limit: number
): Promise<{ items: Item[]; total: number }> => {
  const totalItems = 100;
  const items = Array.from({ length: totalItems }, (_, i) => ({
    id: i + 1,
    name: `Item ${i + 1}`,
  }));

  const start = (page - 1) * limit;
  const end = start + limit;

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ items: items.slice(start, end), total: totalItems });
    }, 500);
  });
};
