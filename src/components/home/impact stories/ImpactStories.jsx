import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ImpactBeforeAfter from "./ImpactBeforeAfter";
import beforeWindow from "../../../assets/beforewindow.webp";
import afterWindow from "../../../assets/afterwindow.webp";
import beforeGarbage from "../../../assets/beforegarbage.webp";
import afterGarbage from "../../../assets/aftergarbage.webp";
import beforePothole from "../../../assets/beforepothole.webp";
import afterPothole from "../../../assets/afterpothole.webp";
import afterPipe from "../../../assets/afterpipe.webp";
import beforePipe from "../../../assets/beforepipe.webp";

const impactData = [
  {
    title: "Broken Window Repaired",
    location: "Mirpur, Dhaka",
    before: beforeWindow,
    after: afterWindow,
    days: "3",
    upvotes: 127,
  },
  {
    title: "Garbage Overflow",
    location: "Banani, Dhaka",
    before: beforeGarbage,
    after: afterGarbage,
    days: "1",
    upvotes: 89,
  },
  {
    title: "Road Potholes",
    location: "Central Market Road, Sylhet",
    before: beforePothole,
    after: afterPothole,
    days: "2",
    upvotes: 156,
  },
  {
    title: "Water Leakage",
    location: "City Park, Chittagong",
    before: beforePipe,
    after: afterPipe,
    days: "3",
    upvotes: 127,
  },
];

export default function ImpactStories() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="w-full px-5 py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
        {/* Premium Header Section */}
        <motion.div
          className="mb-16"
          initial={{ y: 40, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-3xl md:text-5xl font-black text-secondary mb-6 leading-none">
            Transforming{" "}
            <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
              Communities
            </span>
          </h1>
          <p className="text-gray-600 max-w-5xl leading-relaxed font-medium">
            Witness the power of civic engagement through real before-and-after
            transformations across our city.
          </p>
        </motion.div>

        {/* Impact Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {impactData.map((story, index) => (
            <ImpactBeforeAfter
              key={index}
              before={story.before}
              after={story.after}
              title={story.title}
              location={story.location}
              days={story.days}
              upvotes={story.upvotes}
              delay={index * 300}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
