import { Users } from "lucide-react";
import about from "../../assets/about.webp";
import hand from "../../assets/hand.jpg";
import ppl from "../../assets/ppl.jpg";
import { motion } from "framer-motion";
const About = () => {
  const topImages = [hand, ppl];

  const stats = [
    { number: "10K+", label: "Issues Reported" },
    { number: "50K+", label: "Upvotes Cast" },
    { number: "2K+", label: "Resolved Reports" },
    { number: "100+", label: "Active Citizens" },
  ];

  return (
    <section className="text-secondary py-20 px-5 md:px-10 lg:px-20 scroll-section bg-gray-50">
      <div className="max-w-7xl mx-auto space-y-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="relative"
        >
          <div className="absolute left-0 -top-6 h-24 w-24 opacity-20">
            <svg viewBox="0 0 100 100" className="h-full w-full">
              {Array.from({ length: 100 }).map((_, i) => (
                <circle
                  key={i}
                  cx={(i % 10) * 10}
                  cy={Math.floor(i / 10) * 10}
                  r="1.5"
                  fill="#2563eb"
                />
              ))}
            </svg>
          </div>
          <p className="section-title text-primary">
            <Users />
            Know URBANi Better
          </p>
          <h2 className="font-extrabold text-4xl md:text-5xl tracking-tight">
            <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
              Explore
            </span>{" "}
            <span className="text-secondary">Our Story</span>
          </h2>
        </motion.div>
        {/* MISSION SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* LEFT COLUMN */}
          <div className="flex flex-col lg:order-2">
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <p className="text-sm font-medium tracking-widest uppercase text-gray-500 border-t border-gray-300 pt-2 w-24 mb-2">
                OUR MISION
              </p>
              <h1 className="text-3xl md:text-4xl font-extrabold text-secondary leading-tight mt-1">
                Empower Citizens to Improve Their Community
              </h1>
            </motion.div>

            <motion.img
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              src={about}
              alt="Community volunteering"
              className="w-full h-auto object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col">
            <div className="flex space-x-4 mb-8">
              {topImages.map((imgSrc, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2, duration: 0.6 }}
                  key={i}
                  className="flex-1 relative overflow-hidden rounded-lg"
                >
                  <img
                    src={imgSrc}
                    alt=""
                    className="w-full h-36 object-cover"
                  />
                  <div className="absolute top-2 right-2 flex space-x-2">
                    <span className="bg-primary text-white bg-opacity-50 text-xs px-2 py-0.5 rounded">
                      Civic
                    </span>
                    <span className="bg-white text-primary bg-opacity-50 text-xs px-2 py-0.5 rounded">
                      Community
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            <p className="leading-relaxed text-gray-600 mb-8">
              URBANi lets citizens actively participate in improving their local
              infrastructure. Report issues, track resolutions, upvote important
              matters, and stay informed about community initiatives. Together,
              we ensure safer streets, cleaner public spaces, and more
              accountable civic management.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 border-b border-gray-300 pb-5 mb-8">
              {stats.map((stat, i) => (
                <div key={i} className="text-left">
                  <h2 className="text-2xl font-bold text-blue-600">
                    {stat.number}
                  </h2>
                  <p className="text-xs text-gray-500 mt-1 uppercase leading-snug">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
            <p className="leading-relaxed text-gray-600 mb-8">
              With URBANi, citizens can easily voice their concerns, suggest
              improvements, and collaborate on local projects. From fixing
              potholes to organizing community clean-ups, every contribution
              counts. Our platform encourages active participation, fosters
              transparency, and helps build neighborhoods that are safer,
              cleaner, and more connected.
            </p>
          </div>
        </div>

        {/* VISION SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* LEFT COLUMN TEXT */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col"
          >
            <p className="text-sm font-medium tracking-widest uppercase text-gray-500 border-t border-gray-300 pt-2 w-24 mb-2">
              OUR VISION
            </p>
            <h1 className="text-3xl md:text-4xl text-secondary font-extrabold leading-tight mt-1 mb-6">
              Build a Connected & Accountable Community
            </h1>
            <p className="leading-relaxed text-gray-600">
              URBANi envisions a city where citizens, local authorities, and
              organizations collaborate seamlessly. With transparent reporting,
              proactive engagement, and data-driven insights, communities can
              thrive, public services improve, and every voice is heard. Our
              goal is to make civic participation intuitive, rewarding, and
              impactful.
            </p>
          </motion.div>

          {/* RIGHT COLUMN IMAGE */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex justify-center lg:justify-end"
          >
            <img
              src={ppl}
              alt="Community planning"
              className="w-full max-w-md h-auto object-cover rounded-lg shadow-lg"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
