type SetSort = (params: { sortBy: string; sortDirection: string }) => void;

const sortActions = (setSort: SetSort) => {
  const actions = [
    {
      id: 1,
      label: 'Име (растечки)',
      onClick: () =>
        setSort({
          sortBy: 'first_name',
          sortDirection: 'asc',
        }),
    },
    {
      id: 2,
      label: 'Име (опаѓачки)',
      onClick: () =>
        setSort({
          sortBy: 'first_name',
          sortDirection: 'desc',
        }),
    },
    {
      id: 3,
      label: 'Email (растечки)',
      onClick: () =>
        setSort({
          sortBy: 'email',
          sortDirection: 'asc',
        }),
    },
    {
      id: 4,
      label: 'Email (опаѓачки)',
      onClick: () =>
        setSort({
          sortBy: 'email',
          sortDirection: 'desc',
        }),
    },
    {
      id: 5,
      label: 'Улога (растечки)',
      onClick: () =>
        setSort({
          sortBy: 'role',
          sortDirection: 'asc',
        }),
    },
    {
      id: 6,
      label: 'Улога (опаѓачки)',
      onClick: () =>
        setSort({
          sortBy: 'role',
          sortDirection: 'desc',
        }),
    },
  ];

  return actions;
};

export default sortActions;
