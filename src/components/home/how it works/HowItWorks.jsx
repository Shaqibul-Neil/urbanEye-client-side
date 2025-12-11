import { UserPlus, FileText, Eye, MapPin } from "lucide-react";
const features = [
  {
    icon: <UserPlus className="lg:w-7 w-5 h-5 lg:h-7 text-indigo-600" />,
    title: "Registration",
    desc: "Sign up to start reporting and track issues.",
  },
  {
    icon: <FileText className="lg:w-7 w-5 h-5 lg:h-7 text-indigo-600" />,
    title: "Post an Issue",
    desc: "Submit any public issue with details and location.",
  },
  {
    icon: <Eye className="lg:w-7 w-5 h-5 lg:h-7 text-indigo-600" />,
    title: "View Issues",
    desc: "See issues reported by other citizens for transparency.",
  },
  {
    icon: <MapPin className="lg:w-7 w-5 h-5 lg:h-7 text-indigo-600" />,
    title: "Track Issues",
    desc: "Monitor updates and see real-time progress of issues.",
  },
];

const HowItWorks = () => {
  return (
    <div>
      {/* Title Section */}
      <div className="text-center px-3">
        <h2 className="font-extrabold text-primary tracking-tight text-4xl md:text-5xl">
          Our <span className="text-secondary">Proven</span> Work Process
        </h2>
        <p className="mt-4 text-gray-600 text-center">
          Our platform is designed to make reporting public issues simple,
          transparent, and effective. From the moment you register, you gain the
          ability to submit detailed reports, view problems reported by others
          in your community, and track progress in real time.
        </p>
      </div>

      {/* How it works */}
      <div>
        <div className="flex items-center justify-between w-full max-w-6xl mx-auto lg:px-6 px-2 py-16 overflow-x-auto">
          {features.map((item, index) => (
            <div
              key={index}
              className="relative flex-1 flex flex-col items-center"
            >
              {/* Card */}
              <div className="flex flex-col items-center bg-white lg:p-6 p-3 rounded-2xl lg:w-52 w-36 relative">
                <div className="lg:w-14 lg:h-14 w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <div className="absolute top-5 right-9 w-6 h-6 lg:w-8 lg:h-8 lg:right-14 rounded-full bg-primary flex justify-center items-center">
                  <p className="text-white text-xs">{index + 1}</p>
                </div>
                <h3 className="lg:text-lg text-base font-extrabold text-primary mb-1 text-center">
                  {item.title}
                </h3>
                <p className="lg:text-sm text-xs text-gray-600 text-center">
                  {item.desc}
                </p>
              </div>

              {/* Connector line */}
              {index !== features.length - 1 && (
                <div className="absolute top-1/2 right-0 w-full h-1 bg-secondary -z-10 transform translate-x-1/2"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
