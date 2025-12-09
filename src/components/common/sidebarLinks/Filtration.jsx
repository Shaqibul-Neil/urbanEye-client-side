const statusFilterMenu = [
  { id: "pending", label: "Pending" },
  { id: "in-progress", label: "In Progress" },
  { id: "working", label: "Working" },
  { id: "resolved", label: "Resolved" },
  { id: "closed", label: "Closed" },
  { id: "rejected", label: "Rejected" },
];
const priorityFilterMenu = [
  { id: "high", label: "High" },
  { id: "normal", label: "Normal" },
];
export const StatusFiltration = ({ filtrationProps }) => {
  const { filters, onChange } = filtrationProps;
  return (
    <>
      {statusFilterMenu.map((item) => (
        <li key={item.id}>
          <label className="flex items-center justify-between cursor-pointer gap-3">
            <input
              type="checkbox"
              checked={filters.status.includes(item.id)}
              onChange={() => onChange("status", item.id)}
              className="checkbox checkbox-primary"
            />

            <span className="flex-1 text-left">{item.label}</span>
          </label>
        </li>
      ))}
    </>
  );
};

export const PriorityFiltration = ({ filtrationProps }) => {
  const { filters, onChange } = filtrationProps;
  return (
    <>
      {priorityFilterMenu.map((item) => (
        <li key={item.id}>
          <label className="flex items-center justify-between cursor-pointer gap-3">
            <input
              type="checkbox"
              checked={filters.priority.includes(item.id)}
              onChange={() => onChange("priority", item.id)}
              className="checkbox checkbox-primary"
            />

            <span className="flex-1 text-left">{item.label}</span>
          </label>
        </li>
      ))}
    </>
  );
};
