export interface Item {
  id: string;
  name: string;
}

export const fetchItems = async (
  page: number,
  limit: number
): Promise<{ items: Item[]; total: number }> => {
  const totalItems = 100;
  const items = Array.from({ length: totalItems }, (_, i) => ({
    id: (i + 1).toString(),
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

export default fetchItems;
