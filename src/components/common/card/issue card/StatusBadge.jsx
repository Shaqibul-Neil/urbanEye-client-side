import * as LucideIcons from "lucide-react";
import {
  getBar,
  getIconName,
  getStatusBadge,
} from "../../../../utilities/getStatusBadge";

export default function StatusBadge({ status }) {
  if (!status) return null;

  const IconName = getIconName(status); // string
  const IconComponent = LucideIcons[IconName]; // actual component

  return (
    <div
      className={`absolute bottom-4 left-4 flex items-center gap-1 px-2 py-1 rounded-full shadow-md ${getStatusBadge(
        status
      )}`}
    >
      {IconComponent && (
        <IconComponent size={16} style={{ color: getBar(status) }} />
      )}
      <span className="text-xs font-bold uppercase">{status}</span>
    </div>
  );
}
