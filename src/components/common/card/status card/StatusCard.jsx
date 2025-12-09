import {
  FaRegEdit,
  FaClock,
  FaSpinner,
  FaTools,
  FaCheckCircle,
  FaLock,
} from "react-icons/fa";

const statusCards = [
  {
    name: "Created",
    icon: <FaRegEdit className="w-4 h-4 text-[#2563eb]" />,
    desc: "Issue has been created",
  },
  {
    name: "Pending",
    icon: <FaClock className="w-4 h-4 text-[#f59e0b]" />,
    desc: "Awaiting staff assignment",
  },
  {
    name: "In-Progress",
    icon: <FaSpinner className="w-4 h-4 text-[#38bdf8] animate-spin" />,
    desc: "Staff is working on it",
  },
  {
    name: "Working",
    icon: <FaTools className="w-4 h-4 text-[#10b981]" />,
    desc: "Active work ongoing",
  },
  {
    name: "Resolved",
    icon: <FaCheckCircle className="w-4 h-4 text-[#10b981]" />,
    desc: "Issue has been resolved",
  },
  {
    name: "Closed",
    icon: <FaLock className="w-4 h-4 text-[#ef4444]" />,
    desc: "Issue has been closed",
  },
];

const StatusCard = () => {
  return (
    <div className="space-y-8 mt-8">
      {/* Heading & Subheading */}
      <div className="text-center">
        <h3 className="text-xl font-bold text-secondary">
          Issue Status General Overview
        </h3>
        <p className="text-gray-600 text-sm">
          Each card represents a possible status of an issue. Track where an
          issue is in its lifecycle.
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {statusCards.map((status, idx) => (
          <div
            key={idx}
            className={`flex items-center gap-2 p-3 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 bg-linear-to-r from-[#2563eb]/20 to-[#38bdf8]/20`}
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20">
              {status.icon}
            </span>
            <div>
              <p className="font-semibold text-secondary text-sm">
                {status.name}
              </p>
              <p className="text-gray-500 text-xs">{status.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatusCard;
