export const getStatusBadge = (status) => {
  switch (status) {
    case "pending":
      return "bg-yellow-50 text-yellow-700";
    case "in-progress":
      return "bg-blue-100 text-blue-700";
    case "working":
      return "bg-cyan-100 text-cyan-700";
    case "resolved":
      return "bg-green-100 text-green-700";
    case "closed":
      return "bg-gray-100 text-gray-700";
    case "rejected":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export const getBg = (status) => {
  switch (status) {
    case "pending":
      return "#fefce8";
    case "in-progress":
      return "bg-blue-50";
    case "working":
      return "bg-cyan-50";
    case "resolved":
      return "bg-green-50";
    case "closed":
      return "bg-gray-100";
    case "rejected":
      return "bg-red-50";
    default:
      return "bg-gray-50";
  }
};

export const getBorder = (status) => {
  switch (status) {
    case "pending":
      return "border-l-yellow-400";
    case "in-progress":
      return "border-l-blue-400";
    case "working":
      return "border-l-cyan-400";
    case "resolved":
      return "border-l-green-400";
    case "closed":
      return "border-l-gray-400";
    case "rejected":
      return "border-l-red-400";
    default:
      return "bg-gray-50";
  }
};

export const getBar = (status) => {
  switch (status) {
    case "pending":
      return "#fbbf24"; // deep yellow
    case "in-progress":
      return "#60a5fa"; // deep blue
    case "working":
      return "#06b6d4"; // deep cyan
    case "resolved":
      return "#16a34a"; // deep green
    case "closed":
      return "#9ca3af";
    case "rejected":
      return "#ef4444"; // deep red
    default:
      return "#9ca3af"; // default = gray
  }
};
// Lucide icon name based on status
export const getIconName = (status) => {
  switch (status) {
    case "pending":
      return "AlertTriangle"; // pending = alert
    case "in-progress":
      return "Loader"; // in-progress = loading spinner
    case "working":
      return "Target"; // working = target
    case "resolved":
      return "CheckCircle"; // resolved = success
    case "closed":
      return "Lock"; // closed = canceled/closed
    case "rejected":
      return "XCircle";
    default:
      return "Info"; // default info icon
  }
};
