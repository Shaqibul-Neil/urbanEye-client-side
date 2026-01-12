import { FaChartBar } from "react-icons/fa";
import { motion } from "framer-motion";

const MetricCard = ({
  title,
  count,
  icon: Icon = FaChartBar,
  bgColor = "bg-primary/10",
  textColor = "text-primary",
  badgeColor = "bg-primary/10 border-primary/20",
  className = "",
  delay,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        delay: delay * 1,
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      style={{
        transformOrigin: "center bottom",
        willChange: "transform, opacity",
      }}
      className={`bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between h-40 group hover:shadow-md transition-all duration-500 relative overflow-hidden ${className}`}
    >
      {/* Faded Background Icon */}

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.05, scale: 1 }}
        transition={{ delay: delay * 1 + 0.1, duration: 0.3 }}
        className="absolute top-0 right-0 p-4 opacity-5"
      >
        <Icon size={80} className={`${textColor} rotate-12`} />
      </motion.div>

      {/* Top Section */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: delay * 1 + 0.2, duration: 0.4 }}
        className="flex justify-between items-start z-10"
      >
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
      </motion.div>

      {/* Bottom Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: delay * 1 + 0.3, duration: 0.4 }}
        className="z-10 mt-auto"
      >
        <div className="text-4xl font-extrabold text-gray-900 tracking-tight">
          {count || 0}
        </div>
        <div className="text-xs font-semibold text-gray-500 mt-1 capitalize">
          {title.replace("-", " ")}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MetricCard;
