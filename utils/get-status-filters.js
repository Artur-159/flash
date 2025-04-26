export const getStatusFilters = ({ id, selectedIds = [], allIds = [] }) => {
  if (id === "all") return undefined;

  const updated = selectedIds.includes(id)
    ? selectedIds.filter((item) => item !== id)
    : [...selectedIds, id];

  const isAllSelected =
    updated.length === allIds.length &&
    updated.every((id) => allIds.includes(id));

  return isAllSelected ? undefined : updated;
};
