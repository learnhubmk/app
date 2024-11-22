const buildMembersUrl = (
  baseUrl: string,
  paginationPage: number,
  sort: { sortDirection: string; sortBy: string },
  search: string
) => {
  const params = new URLSearchParams({
    per_page: '5',
    page: paginationPage.toString(),
    sort_direction: sort.sortDirection,
    sort_by: sort.sortBy,
    query: search,
  });

  return `${baseUrl}?${params.toString()}`;
};

export default buildMembersUrl;
