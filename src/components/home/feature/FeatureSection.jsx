import { ShieldCheck, MapPin, Bell, PhoneCall } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-indigo-600" />,
      title: "Verified Staff Handling",
      desc: "Every report is managed by authorized municipal staff, ensuring accountability and quality response.",
    },
    {
      icon: <MapPin className="w-8 h-8 text-indigo-600" />,
      title: "Location-Based Tracking",
      desc: "Browse reported problems around your area and monitor progress in real time.",
    },
    {
      icon: <Bell className="w-8 h-8 text-indigo-600" />,
      title: "Instant Status Notifications",
      desc: "Get notified whenever your submitted issue is assigned, reviewed, or resolved.",
    },
    {
      icon: <PhoneCall className="w-8 h-8 text-indigo-600" />,
      title: "Emergency Priority System",
      desc: "Critical public safety concerns are auto-flagged and forwarded to emergency teams instantly.",
    },
  ];

  return (
    <section className="lg:py-24 py-16 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Content */}
        <div className="max-w-md space-y-4">
          <h2 className="font-extrabold text-primary tracking-tight text-4xl md:text-5xl">
            Build a <span className="text-secondary">Safer Community</span> with
            Our Public Reporting System
          </h2>

          <p className="text-gray-600 mb-6 leading-relaxed">
            A powerful and transparent platform where citizens can report
            issues, track progress, and help improve their city with ease.
          </p>
          <button className="px-6 py-3 border border-primary text-primary rounded-full shadow-md hover:bg-primary hover:text-white  cursor-pointer transition-all duration-300">
            Report an Issue
          </button>
        </div>

        {/* Right Features Grid */}
        <div className="features grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((item, index) => (
            <div
              key={index}
              className={`feature bg-linear-to-br from-white via-[#f8f9ff] to-white backdrop-blur-xl rounded-2xl p-6 shadow-md border border-white transition-transform duration-300 ${
                index % 2 === 1 ? "md:translate-y-8" : ""
              } hover:scale-110`}
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
