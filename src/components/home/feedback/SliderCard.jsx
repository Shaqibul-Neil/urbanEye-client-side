import { Star } from "lucide-react";
import { MdArrowOutward } from "react-icons/md";
import { Link } from "react-router";

const SliderCard = ({ testimony }) => {
  const { rating, desc, image, name, company } = testimony || {};
  return (
    <div className="max-w-md mx-auto lg:mx-0">
      <div className="testimony-inner relative w-full h-full bg-white rounded-3xl overflow-hidden">
        <div className="testimony-box w-full h-full bg-white rounded-3xl overflow-hidden relative">
          <div className="bg-blue-100 p-4 rounded-3xl hover:bg-blue-300 transition-colors duration-300 h-full">
            {" "}
            {/* Rating */}
            <div className="flex mb-4">
              {Array.from({ length: rating }).map((_, idx) => (
                <Star
                  key={idx}
                  className="md:w-5 md:h-5 w-3 h-3 text-secondary"
                />
              ))}
            </div>
            {/* Description */}
            <p className="text-gray-700 md:text-sm text-xs mb-6 line-clamp-2">
              {desc}
            </p>
            {/* User Info */}
            <div className="flex items-center mt-auto">
              <img
                src={image}
                alt={name}
                className="md:w-12 md:h-12 w-8 h-8 rounded-full object-cover mr-4"
              />
              <div className="flex flex-col">
                <span className="font-semibold text-gray-900 md:text-md text-sm">
                  {name}
                </span>
                <span className="text-gray-500 md:text-sm text-xs">
                  {company}
                </span>
              </div>
            </div>
          </div>

          <div className="testimony-icon absolute top-35 right-0 w-16 h-16 rounded-tl-[50%] bg-white">
            <div className="absolute inset-3 bg-white rounded-full flex items-center justify-center">
              <span className="text-white text-2xl">
                <div className="w-10 h-10"></div>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SliderCard;
