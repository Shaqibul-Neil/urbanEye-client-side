import { Sparkles, Rss, Play, Video, LayoutList } from "lucide-react";
import { Link } from "react-router";

// Define the custom CSS for the marquee animation
const customStyles = `
  @keyframes curve-marquee {
    0% { transform: translateX(0%); }
    100% { transform: translateX(-50%); } /* Animate full width to loop */
  }

  .animate-curve-marquee {
    animation: curve-marquee 15s linear infinite;
  }
`;

const ICON_DATA = [
  { icon: Video, color: "bg-purple-600", name: "Video" },
  { icon: Play, color: "bg-red-600", name: "YouTube" },
  { icon: Rss, color: "bg-gray-900", name: "Feed" },
  { icon: LayoutList, color: "bg-blue-600", name: "Playlist" },
  { icon: Sparkles, color: "bg-yellow-600", name: "Premium" },
];

const NotSubscribed = () => {
  // double the data to simulate an infinite marquee loop
  const marqueeIcons = [...ICON_DATA, ...ICON_DATA];

  return (
    // Inject the custom styles into the component scope (or use a dedicated CSS file)
    <>
      <style>{customStyles}</style>

      <div className="w-full mx-auto bg-white p-2 rounded-3xl shadow-2xl border border-gray-100">
        {/* === Icon Marquee Section === */}
        <div className="relative h-16 overflow-hidden">
          {/* The Marquee Track Container */}
          <div className="absolute top-1/2 left-0 w-[200%] flex -translate-y-1/2 animate-curve-marquee">
            {marqueeIcons.map((item, index) => {
              const IconComponent = item.icon;

              // Apply specific rotations and translations to simulate the curved path
              // The odd-indexed icons are slightly higher and rotated to match the arc
              const curveStyle =
                index % 2 !== 0
                  ? "transform rotate-[-15deg] translate-y-[-10px]"
                  : "transform rotate-[5deg] translate-y-[10px]";

              return (
                <div
                  key={index}
                  className={`shrink-0 w-8 h-8 mx-2 p-3 rounded-xl shadow-lg transition duration-300 ${item.color} ${curveStyle}`}
                >
                  {/* Using white icons for contrast */}
                  <IconComponent className="w-full h-full text-white" />
                </div>
              );
            })}
          </div>
        </div>

        {/* === Text Content Section === */}
        <div className="text-center">
          <h2 className="text-lg font-extrabold text-secondary my-1">
            Post Unlimited?
          </h2>
        </div>

        {/* === CTA Button Section === */}
        <Link
          className="w-full flex items-center justify-center bg-primary text-white font-semibold py-3 px-4 rounded-xl hover:bg-gray-800 transition duration-300 shadow-xl"
          to={"/dashboard/my-profile"}
        >
          Go Premium
          <Sparkles className="w-4 h-4 ml-2 text-yellow-400 fill-yellow-400" />
        </Link>
      </div>
    </>
  );
};

export default NotSubscribed;
