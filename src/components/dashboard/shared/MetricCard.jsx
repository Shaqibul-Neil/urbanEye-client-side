import { FaChartBar } from "react-icons/fa";

const MetricCard = ({
  title,
  count,
  icon: Icon = FaChartBar,
  bgColor = "bg-primary/10",
  textColor = "text-primary",
  badgeColor = "bg-primary/10 border-primary/20",
  className = "",
}) => {
  return (
    <div
      className={`bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between h-40 group hover:shadow-md transition-all duration-300 relative overflow-hidden ${className}`}
    >
      {/* Faded Background Icon */}
      <div className="absolute top-0 right-0 p-4 opacity-5">
        <Icon size={80} className={`${textColor} rotate-12`} />
      </div>

      {/* Top Section */}
      <div className="flex justify-between items-start z-10">
        <div
          className={`w-10 h-10 rounded-full ${bgColor} flex items-center justify-center ${textColor}`}
        >
          <Icon size={18} />
        </div>

        <span
          className={`text-[10px] font-bold ${textColor} uppercase tracking-wider ${badgeColor} px-2 py-1 rounded-full border`}
        >
          {title}
        </span>
      </div>

      {/* Bottom Section */}
      <div className="z-10 mt-auto">
        <div className="text-4xl font-extrabold text-gray-900 tracking-tight">
          {count || 0}
        </div>
        <div className="text-xs font-semibold text-gray-500 mt-1 capitalize">
          {title.replace("-", " ")}
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
