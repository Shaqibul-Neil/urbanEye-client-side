import { Clock, Zap, MapPin, CheckCircle2 } from "lucide-react";
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
  const [sliderPosition, setSliderPosition] = useState(25);
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // Auto-animate slider on mount
  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setSliderPosition(50);
      }, delay + 800);
      return () => clearTimeout(timer);
    }
  }, [isInView, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ y: 40, opacity: 0, scale: 0.95 }}
      animate={
        isInView
          ? { y: 0, opacity: 1, scale: 1 }
          : { y: 40, opacity: 0, scale: 0.95 }
      }
      transition={{
        duration: 0.8,
        delay: delay / 1000,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{
        y: -8,
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative"
    >
      {/* Floating Glow Effect */}
      <motion.div
        className={`absolute -inset-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl blur-2xl opacity-0 group-hover:opacity-10 transition-all duration-700`}
        animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
      />

      {/* Glass Morphism Card */}
      <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl border border-white/30 overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-500">
        {/* Success Indicator */}
        <div className="absolute top-4 right-4 z-20">
          <motion.div
            className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
            initial={{ scale: 0, rotate: -180 }}
            animate={
              isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }
            }
            transition={{
              delay: delay / 1000 + 0.5,
              duration: 0.6,
              ease: "backOut",
            }}
          >
            <CheckCircle2 size={16} className="text-white" />
          </motion.div>
        </div>

        {/* Before/After Slider */}
        <div className="relative h-72 w-full overflow-hidden rounded-t-3xl">
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
            position={sliderPosition}
            onPositionChange={setSliderPosition}
            className="h-full cursor-w-resize"
            handle={
              <div className="w-12 h-12 bg-white rounded-full shadow-2xl border-4 border-white flex items-center justify-center backdrop-blur-sm cursor-w-resize ">
                <div
                  className={`w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center`}
                >
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                {/* Horizontal line indicator */}
              </div>
            }
          />

          {/* Before/After Labels */}
          <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full">
            <span className="text-white text-xs font-semibold">BEFORE</span>
          </div>
          <div className="absolute bottom-4 right-4 bg-success backdrop-blur-sm px-3 py-1 rounded-full">
            <span className="text-white text-xs font-semibold">AFTER</span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 relative">
          {/* Floating Background Pattern */}
          <div className="absolute top-0 right-0 w-32 h-32 opacity-[0.02] transform rotate-12 group-hover:rotate-45 transition-transform duration-1000">
            <CheckCircle2 size={128} className="text-gray-900" />
          </div>

          <div className="relative z-10">
            {/* Title & Location */}
            <div className="mb-4">
              <h3 className="text-xl font-black text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                {title}
              </h3>
              <div className="flex items-center gap-2 text-gray-500">
                <MapPin size={14} className="text-gray-400" />
                <span className="text-sm font-medium">{location}</span>
              </div>
            </div>

            {/* Impact Metrics */}
            <div className="grid grid-cols-2 mb-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-1">
                  <div className="flex items-center justify-center shadow-lg">
                    <Clock size={16} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-lg font-black text-gray-900">
                      {days}{" "}
                      <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                        Days
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-1">
                  <div className="flex items-center justify-center shadow-lg">
                    <Zap size={16} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-lg font-black text-gray-900">
                      {upvotes}{" "}
                      <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                        Upvotes
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
