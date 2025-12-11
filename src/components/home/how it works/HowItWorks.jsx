import { UserPlus, FileText, Eye, MapPin } from "lucide-react";
import Heading from "../../common/heading/Heading";
const features = [
  {
    icon: <UserPlus className="w-7 h-7 text-indigo-600" />,
    title: "User Registration",
    desc: "Sign up to start reporting and tracking issues in your area.",
  },
  {
    icon: <FileText className="w-7 h-7 text-indigo-600" />,
    title: "Post an Issue",
    desc: "Submit any public issue easily with details and location.",
  },
  {
    icon: <Eye className="w-7 h-7 text-indigo-600" />,
    title: "View Others' Issues",
    desc: "See issues reported by other citizens for transparency.",
  },
  {
    icon: <MapPin className="w-7 h-7 text-indigo-600" />,
    title: "Track Issue Progress",
    desc: "Monitor status updates and see real-time progress of issues.",
  },
];

const HowItWorks = () => {
  return (
    <div>
      {/* Title Section */}
      <div className="text-center">
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
        <div className="flex items-center justify-between w-full max-w-6xl mx-auto px-6 py-16">
          {features.map((item, index) => (
            <div
              key={index}
              className="relative flex-1 flex flex-col items-center"
            >
              {/* Card */}
              <div className="flex flex-col items-center bg-white p-6 rounded-2xl w-52">
                <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-extrabold text-primary mb-1 text-center">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 text-center">{item.desc}</p>
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
