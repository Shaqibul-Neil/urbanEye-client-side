import { useState } from "react";
import { easeInOut, motion } from "framer-motion";
import { HiOutlineBriefcase } from "react-icons/hi";
import { FiUsers, FiStar, FiFileText } from "react-icons/fi";
import { AiOutlineClockCircle } from "react-icons/ai";
import { IoMdArrowForward } from "react-icons/io";
import { Target } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: easeInOut,
    },
  },
  hover: {
    scale: 1.05,
    y: -6,
  },
};

const JobPortal = () => {
  const [selectedJob, setSelectedJob] = useState(null);

  const jobs = [
    {
      title: "Frontend Developer",
      company: "URBANi Tech",
      location: "Dhaka, Bangladesh",
      posts: "12 posts",
      description:
        "Build responsive web applications with React, TailwindCSS, and Framer Motion.",
      responsibilities: [
        "Develop and maintain web UI components",
        "Integrate RESTful APIs",
        "Optimize application performance",
        "Ensure responsive design across devices",
      ],
      requirements: ["React", "TailwindCSS", "JavaScript", "Git"],
    },
    {
      title: "UI/UX Designer",
      company: "URBANi Design",
      location: "Dhaka, Bangladesh",
      posts: "8 posts",
      description:
        "Design user-centric, award-winning web interfaces for multiple platforms.",
      responsibilities: [
        "Wireframes, mockups, and prototypes",
        "Collaborate with frontend developers",
        "Maintain design system and consistency",
        "Conduct user research and testing",
      ],
      requirements: ["Figma", "Adobe XD", "User Research", "Creativity"],
    },
    {
      title: "Backend Developer",
      company: "URBANi Tech",
      location: "Remote",
      posts: "15 posts",
      description:
        "Develop scalable backend services and APIs with Node.js and MongoDB.",
      responsibilities: [
        "Develop RESTful APIs",
        "Database design and management",
        "Security and authentication implementation",
        "Performance optimization",
      ],
      requirements: ["Node.js", "MongoDB", "REST API", "Postman"],
    },
    {
      title: "Digital Marketing Specialist",
      company: "URBANi Marketing",
      location: "Dhaka, Bangladesh",
      posts: "10 posts",
      description:
        "Plan and execute digital marketing campaigns to grow URBANi’s presence.",
      responsibilities: [
        "Manage social media platforms",
        "SEO and content marketing",
        "Analytics tracking and reporting",
        "Collaborate with design and product teams",
      ],
      requirements: [
        "SEO",
        "Content Marketing",
        "Google Analytics",
        "Creativity",
      ],
    },
  ];

  return (
    <div className="min-h-screen max-w-7xl mx-auto py-16 px-4 space-y-12">
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
          <Target />
          Job Portal
        </p>
        <h2 className="font-extrabold text-4xl md:text-5xl tracking-tight">
          <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
            Career
          </span>{" "}
          <span className="text-secondary">Opportunities</span>
        </h2>
      </motion.div>
      <div className="grid lg:grid-cols-4 gap-8">
        {/* Jobs Grid */}
        <div className="lg:col-span-3 grid gap-6">
          {jobs.map((job, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true }}
              className="bg-gradient-to-r from-white to-blue-50 p-6 rounded-xl shadow-sm space-y-4 transform transition-all duration-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-secondary">
                    {job.title}
                  </h3>
                  <p className="text-sm text-primary">{job.posts}</p>
                </div>
                <HiOutlineBriefcase className="text-2xl text-primary" />
              </div>
              <p className="text-gray-600 text-sm">
                {job.company} | {job.location}
              </p>
              <div className="text-right mt-4">
                <button
                  onClick={() => setSelectedJob(job)}
                  className="flex items-center gap-2 text-primary font-semibold hover:text-secondary transition cursor-pointer"
                >
                  View Details <IoMdArrowForward />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats / Right Grid */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-100"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <FiUsers size={16} className="text-white" />
              </div>
              <span className="text-sm font-medium text-secondary">
                Active Jobs
              </span>
            </div>
            <span className="text-xl font-bold text-primary">120+</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-success rounded-lg flex items-center justify-center">
                <FiStar size={16} className="text-white" />
              </div>
              <span className="text-sm font-medium text-secondary">
                Companies
              </span>
            </div>
            <span className="text-xl font-bold text-success">80+</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex items-center justify-between p-3 bg-cyan-50 rounded-lg border border-cyan-100"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <FiFileText size={16} className="text-white" />
              </div>
              <span className="text-sm font-medium text-secondary">
                Applications
              </span>
            </div>
            <span className="text-xl font-bold text-accent">500+</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-100"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-warning rounded-lg flex items-center justify-center">
                <AiOutlineClockCircle size={16} className="text-white" />
              </div>
              <span className="text-sm font-medium text-secondary">
                Support
              </span>
            </div>
            <span className="text-xl font-bold text-warning">24/7</span>
          </motion.div>
        </div>
      </div>

      {/* Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="bg-white p-8 rounded-xl max-w-2xl w-full overflow-y-auto max-h-[90vh] space-y-6"
          >
            <div className="flex justify-between items-start relative">
              <div>
                <h3 className="text-2xl font-bold text-secondary">
                  {selectedJob.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {selectedJob.company} | {selectedJob.location}
                </p>
              </div>
              <button
                onClick={() => setSelectedJob(null)}
                className="text-red-500 hover:text-secondary cursor-pointer font-bold text-4xl absolute -top-5 -right-5"
              >
                &times;
              </button>
            </div>

            <p className="text-gray-700">{selectedJob.description}</p>

            <div>
              <p className="font-semibold text-secondary">Responsibilities:</p>
              <ul className="list-disc list-inside text-gray-600">
                {selectedJob.responsibilities.map((r, idx) => (
                  <li key={idx}>{r}</li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-semibold text-secondary">Requirements:</p>
              <ul className="list-disc list-inside text-gray-600">
                {selectedJob.requirements.map((r, idx) => (
                  <li key={idx}>{r}</li>
                ))}
              </ul>
            </div>

            <div className="text-right">
              <button className="btn btn-primary px-6 py-2 rounded-xl text-white">
                Apply Now
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default JobPortal;
