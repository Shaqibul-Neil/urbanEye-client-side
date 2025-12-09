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
    <div className="grid grid-cols-2 gap-0">
      {statusFilterMenu.map((item) => (
        <li key={item.id}>
          <label className="flex cursor-pointer gap-1 text-sm -ml-2">
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
    </div>
  );
};

export const PriorityFiltration = ({ filtrationProps }) => {
  const { filters, onChange } = filtrationProps;
  return (
    <div className="grid grid-cols-2 gap-0">
      {priorityFilterMenu.map((item) => (
        <li key={item.id}>
          <label className="flex items-center justify-between cursor-pointer gap-1 -ml-2">
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
    </div>
  );
};
