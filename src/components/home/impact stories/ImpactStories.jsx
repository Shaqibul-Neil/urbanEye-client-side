import ImpactBeforeAfter from "./ImpactBeforeAfter";
import beforeWindow from "../../../assets/beforewindow.webp";
import afterWindow from "../../../assets/afterwindow.webp";
import beforeGarbage from "../../../assets/beforegarbage.webp";
import afterGarbage from "../../../assets/aftergarbage.webp";
import beforePothole from "../../../assets/beforepothole.webp";
import afterPothole from "../../../assets/afterpothole.webp";

const stories = [
  {
    title: "Broken Window Repaired",
    location: "Mirpur, Dhaka",
    before: beforeWindow,
    after: afterWindow,
    days: "1 days",
    upvotes: 124,
  },
  {
    title: "Garbage Overflow",
    location: "Banani, Dhaka",
    before: beforeGarbage,
    after: afterGarbage,
    days: "2 days",
    upvotes: 89,
  },
  {
    title: "Road Potholes",
    location: "Central Market Road, Sylhet",
    before: beforePothole,
    after: afterPothole,
    days: "1 days",
    upvotes: 67,
  },
];

export default function ImpactStories() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
            Real Impact, <span className="text-primary">Visible Change</span>
          </h2>
          <p className="mt-4 text-gray-600">
            See how citizen-driven priorities turn problems into solutions.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((story, i) => (
            <ImpactBeforeAfter key={i} {...story} delay={i * 300} />
          ))}
        </div>
      </div>
    </section>
  );
}
