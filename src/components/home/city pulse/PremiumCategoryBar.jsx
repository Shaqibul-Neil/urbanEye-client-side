import { useEffect, useState } from "react";
import { Target } from "lucide-react";

const PremiumCategoryBar = ({ category, index, maxCount }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      setProgress((category.total / maxCount) * 100);
    }, index * 300 + 1000);

    return () => clearTimeout(timer);
  }, [category.total, maxCount, index]);

  const getGradient = (index) => {
    const gradients = [
      "from-blue-500 via-blue-600 to-indigo-600",
      "from-purple-500 via-purple-600 to-pink-600",
      "from-indigo-500 via-indigo-600 to-purple-600",
    ];
    return gradients[index % gradients.length];
  };

  const getIconColor = (index) => {
    const colors = ["text-blue-600", "text-purple-600", "text-indigo-600"];
    return colors[index % colors.length];
  };

  return (
    <div
      className={`group transform transition-all duration-700 ${
        isVisible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <div
            className={`w-4 h-4 rounded-full bg-gradient-to-r ${getGradient(
              index
            )} shadow-lg`}
          ></div>
          <div>
            <span className="font-bold text-gray-800 text-base">
              {category.name}
            </span>
            <div className="flex items-center gap-2 mt-1">
              <Target size={12} className={getIconColor(index)} />
              <span className="text-xs text-gray-500 font-medium">
                Priority Category
              </span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-black text-gray-900">
            {category.total}
          </div>
          <div className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full font-semibold">
            {Math.round((category.total / maxCount) * 100)}%
          </div>
        </div>
      </div>

      <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden shadow-inner">
        <div
          className={`absolute top-0 left-0 h-full bg-gradient-to-r ${getGradient(
            index
          )} rounded-full transition-all duration-2000 ease-out shadow-lg`}
          style={{ width: `${progress}%` }}
        >
          <div className="absolute inset-0 bg-white/30 rounded-full"></div>
          <div className="absolute top-0 right-0 w-2 h-full bg-white/50 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default PremiumCategoryBar;
