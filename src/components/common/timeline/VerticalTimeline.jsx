import {
  FaRegEdit,
  FaUserPlus,
  FaSpinner,
  FaTools,
  FaCheckCircle,
  FaLock,
} from "react-icons/fa";
import { FiZap } from "react-icons/fi";

const actionIcons = [
  { name: "created", icon: <FaRegEdit className="w-5 h-5 text-primary" /> },
  { name: "assigned", icon: <FaUserPlus className="w-5 h-5 text-primary" /> },
  {
    name: "in-progress",
    icon: <FaSpinner className="w-5 h-5 text-primary" />,
  },
  { name: "working", icon: <FaTools className="w-5 h-5 text-primary" /> },
  {
    name: "resolved",
    icon: <FaCheckCircle className="w-5 h-5 text-primary" />,
  },
  {
    name: "boosted",
    icon: <FiZap className="w-5 h-5 text-primary" />,
  },
  { name: "closed", icon: <FaLock className="w-5 h-5 text-primary" /> },
];

const VerticalTimeline = ({ issue }) => {
  const { timeline } = issue || {};
  const reversedTimeline = [...(timeline || [])].sort(
    (a, b) => new Date(b.at) - new Date(a.at)
  );
  //console.log(timeline);
  return (
    <ul className="steps steps-vertical">
      {reversedTimeline.map((item, index) => {
        const actionIconObj = actionIcons.find((a) =>
          item.action.toLowerCase().includes(a.name)
        );

        return (
          <li key={index} className="step step-neutral">
            <span
              className={`step-icon flex items-center justify-center w-10 h-10 text-white text-xl bg-white border-primary`}
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
