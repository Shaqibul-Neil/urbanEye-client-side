import {
  FaRegEdit,
  FaUserPlus,
  FaSpinner,
  FaTools,
  FaCheckCircle,
  FaLock,
} from "react-icons/fa";

const actionIcons = [
  { name: "created", icon: <FaRegEdit className="w-5 h-5 text-gray-800" /> },
  { name: "assigned", icon: <FaUserPlus className="w-5 h-5 text-gray-800" /> },
  {
    name: "in-progress",
    icon: <FaSpinner className="w-5 h-5 text-gray-800 animate-spin" />,
  },
  { name: "working", icon: <FaTools className="w-5 h-5 text-gray-800" /> },
  {
    name: "resolved",
    icon: <FaCheckCircle className="w-5 h-5 text-gray-800" />,
  },
  { name: "closed", icon: <FaLock className="w-5 h-5 text-gray-800" /> },
];

const VerticalTimeline = ({ issue }) => {
  const { timeline } = issue || {};
  const reversedTimeline = [...(timeline || [])].sort(
    (a, b) => new Date(a.at) - new Date(b.at)
  );
  return (
    <ul className="steps steps-vertical">
      {reversedTimeline.map((item, index) => {
        const actionIconObj = actionIcons.find((a) =>
          item.action.toLowerCase().includes(a.name)
        );

        // Color mapping
        const circleColor = {
          created: "bg-blue-200",
          assigned: "bg-yellow-200",
          "in-progress": "bg-orange-200",
          working: "bg-purple-200",
          resolved: "bg-green-200",
          closed: "bg-gray-200",
        };

        return (
          <li key={index} className="step step-neutral">
            <span
              className={`step-icon flex items-center justify-center w-10 h-10 text-white text-xl ${
                circleColor[actionIconObj?.name] || "bg-gray-400"
              }`}
            >
              {actionIconObj?.icon || "❓"}
            </span>
            {item.action}
          </li>
        );
      })}
    </ul>
  );
};

export default VerticalTimeline;
