import { Clock, Zap } from "lucide-react";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";
import { motion, useInView } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export default function ImpactBeforeAfter({
  before,
  after,
  title,
  location,
  days,
  upvotes,
  delay = 0,
}) {
  const [animatedCount, setAnimatedCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        let start = 0;
        const end = 3;
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
    }
  }, [isInView, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ y: 32, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : { y: 32, opacity: 0 }}
      transition={{
        duration: 1,
        delay: delay / 1000,
        ease: "easeOut",
      }}
      whileHover={{
        scale: 1.05,
        y: -12,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      className="bg-white rounded-2xl border overflow-hidden shadow-sm cursor-pointer"
    >
      {/* Slider */}
      <div className="relative h-64 w-full">
        <ReactCompareSlider
          itemOne={
            <ReactCompareSliderImage
              src={before}
              alt="Before"
              className="object-cover"
            />
          }
          itemTwo={
            <ReactCompareSliderImage
              src={after}
              alt="After"
              className="object-cover"
            />
          }
          className="h-full"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500 mt-1">{location}</p>
        <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
          <span>
            <Clock className="w-4 h-4 text-primary inline" /> Resolved in {days}
          </span>
          <span>
            <Zap className="w-4 h-4 text-primary inline" /> {upvotes} upvotes
          </span>
        </div>
      </div>
    </motion.div>
  );
}
