import { useEffect, useState } from "react";
import { Clock, Zap } from "lucide-react";

const PremiumResolutionCard = ({ avgTime }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const maxDays = 7;
  const percentage = Math.min((avgTime / maxDays) * 100, 100);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      setProgress(percentage);
    }, 1200);

    return () => clearTimeout(timer);
  }, [percentage]);

  const getPerformanceRating = (days) => {
    if (days <= 2)
      return { text: "Excellent", color: "text-green-600", bg: "bg-green-50" };
    if (days <= 4)
      return { text: "Good", color: "text-blue-600", bg: "bg-blue-50" };
    return { text: "Needs Focus", color: "text-amber-600", bg: "bg-amber-50" };
  };

  const rating = getPerformanceRating(avgTime);

  return (
    <div
      className={`bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-sm border border-white/30 relative overflow-hidden md:w-1/2 md:h-full transform transition-all duration-1000 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      {/* Premium Background Gradient
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-indigo-50/30 to-purple-50/50"></div> */}

      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-10 h-10 bg-indigo-50 rounded-2xl flex items-center justify-center shadow-lg">
            <Clock size={20} className="text-indigo-800" />
          </div>
          <div>
            <h3 className="text-lg font-black text-gray-800">
              Resolution Time
            </h3>
            <p className="text-xs text-gray-500 font-medium">
              Average completion rate
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="relative w-40 h-40">
            <svg
              className="w-40 h-40 transform -rotate-90"
              viewBox="0 0 100 100"
            >
              {/* Background Circle */}
              <circle
                cx="50"
                cy="50"
                r="30"
                stroke="currentColor"
                strokeWidth="6"
                fill="transparent"
                className="text-gray-200"
              />
              {/* Progress Circle */}
              <circle
                cx="50"
                cy="50"
                r="30"
                stroke="url(#resolutionGradient)"
                strokeWidth="6"
                fill="transparent"
                strokeDasharray={`${progress * 2.2} 220`}
                strokeLinecap="round"
                className="transition-all duration-2000 ease-out drop-shadow-lg"
              />
              <defs>
                <linearGradient
                  id="resolutionGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="50%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </svg>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-black text-gray-900 mb-1">
                  {avgTime}
                </div>
                <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">
                  Days
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <div
            className={`inline-flex items-center gap-3 ${rating.bg} px-6 py-3 rounded-2xl border border-white/50 shadow-lg`}
          >
            <Zap size={16} className={rating.color} />
            <span className={`text-sm font-bold ${rating.color}`}>
              {rating.text}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumResolutionCard;
