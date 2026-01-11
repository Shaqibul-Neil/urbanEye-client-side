import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";

const PremiumMetricCard = ({
  title,
  count,
  icon: Icon,
  gradient,
  delay = 0,
}) => {
  const [animatedCount, setAnimatedCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      let start = 0;
      const end = count;
      const duration = 2000;
      const increment = end / (duration / 16);

      const counter = setInterval(() => {
        start += increment;
        if (start >= end) {
          setAnimatedCount(end);
          clearInterval(counter);
        } else {
          setAnimatedCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(counter);
    }, delay);

    return () => clearTimeout(timer);
  }, [count, delay]);

  return (
    <div
      className={`relative group cursor-pointer transform transition-all duration-1000 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      } hover:scale-105 hover:-translate-y-3`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Subtle Glow Effect */}
      <div
        className={`absolute -inset-2 ${gradient} rounded-3xl blur-2xl opacity-4 group-hover:opacity-20 transition-all duration-700`}
      ></div>

      {/* Glass Morphism Card with Subtle Shadow */}
      <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl md:p-4 p-2 shadow-sm border border-white/30 overflow-hidden group-hover:shadow-md transition-all duration-500">
        {/* Floating Background Pattern */}
        <div className="absolute top-0 right-0 w-40 h-40 opacity-[0.03] transform rotate-12 group-hover:rotate-45 transition-transform duration-1000">
          <Icon size={100} className="text-gray-900" />
        </div>

        {/* Premium Floating Orb */}
        <div
          className={`absolute top-6 right-6 w-10 h-10 ${gradient} rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}
        >
          <Icon size={18} className="text-white" />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <div
              className={`w-1 h-12 ${gradient} rounded-full shadow-lg`}
            ></div>
            <div>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] block mb-1">
                {title}
              </span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-400 font-medium">Live</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-4xl font-black text-gray-900 tracking-tight leading-none">
              {animatedCount.toLocaleString()}
            </div>

            {/* Premium Progress Indicator */}
            {/* <div className="flex items-center gap-3">
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full ${gradient} rounded-full transition-all duration-2000 ease-out`}
                  style={{
                    width: `${Math.min(
                      (animatedCount / Math.max(count, 1)) * 100,
                      100
                    )}%`,
                  }}
                ></div>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <TrendingUp size={14} />
                <span className="font-semibold">Active</span>
              </div>
            </div> */}
          </div>
        </div>

        {/* Hover Shine Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform skew-x-12 group-hover:translate-x-full transition-transform duration-1000"></div>
        </div>
      </div>
    </div>
  );
};

export default PremiumMetricCard;
