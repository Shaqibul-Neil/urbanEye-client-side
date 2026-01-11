import { Target, MessageSquare, TrendingUp, Users } from "lucide-react";
import { motion } from "framer-motion";
const civicTips = [
  {
    title: "Stay Informed",
    desc: "Regularly check community updates to stay aware of ongoing issues.",
    icon: Target,
    color: "blue",
  },
  {
    title: "Timely Reporting",
    desc: "Report problems as soon as you notice them to help resolve faster.",
    icon: MessageSquare,
    color: "green",
  },
  {
    title: "Keep Updated",
    desc: "Maintain your profile so notifications reach you accurately.",
    icon: TrendingUp,
    color: "yellow",
  },
];

const CivicTipsCards = () => {
  return (
    <div className="space-y-4 bg-white p-6 rounded-3xl grid md:grid-cols-3 gap-4">
      {civicTips.map((tip, idx) => {
        const Icon = tip.icon;
        return (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 * idx, duration: 0.6 }}
            key={idx}
            className={`p-4 rounded-lg border-l-4 h-full ${
              tip.color === "blue"
                ? "bg-blue-50 border-blue-500"
                : tip.color === "green"
                ? "bg-green-50 border-green-500"
                : tip.color === "yellow"
                ? "bg-yellow-50 border-yellow-500"
                : ""
            }`}
          >
            <div className="flex items-start gap-3">
              <Icon
                className={`w-5 h-5 mt-0.5 shrink-0 ${
                  tip.color === "blue"
                    ? "text-blue-500"
                    : tip.color === "green"
                    ? "text-green-500"
                    : tip.color === "yellow"
                    ? "text-yellow-500"
                    : ""
                }`}
              />
              <div>
                <h4 className="font-semibold text-gray-800 text-sm mb-1">
                  {tip.title}
                </h4>
                <p className="text-xs text-gray-600">{tip.desc}</p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default CivicTipsCards;
