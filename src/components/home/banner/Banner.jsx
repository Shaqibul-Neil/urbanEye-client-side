import Lottie from "lottie-react";
import citySkyline from "../../../lottie/citySkyline.json";
import globe from "../../../assets/globe.png";
import { Link } from "react-router";
import StatsBannerCard from "./StatsBannerCard";
const Banner = () => {
  return (
    <div className="relative">
      <h1
        className="transform text-center text-[64px] lg:text-[270px] md:text-[150px] font-black opacity-100 pointer-events-none tracking-[58px] leading-none bg-linear-to-b from-white to-[#e5edf0]
    bg-clip-text 
    text-transparent pl-9
"
      >
        UrBANi
      </h1>
      <div className="grid lg:grid-cols-4 items-center relative px-8 gap-16">
        {/* Left */}
        <div className="col-span-1 relative">
          <div className="relative -top-40">
            <img src={globe} alt="" className="w-72 relative z-10" />
            {/* Circular shadow */}
            <div className="absolute bottom-4 left-12 w-32 h-32 bg-blue-100/40  rounded-full z-9" />
            {/* Card content */}
            <div className="absolute top-24 left-8 w-64 bg-white rounded-tr-[100px] z-5 px-5 pt-24 pb-6">
              <h3 className="text-lg font-black text-primary">
                Report fast. Track faster.
              </h3>
              <p className="text-secondary font-light tracking-wider">
                {" "}
                Spotted a city problem? Report it instantly with{" "}
                <span className="text-primary font-bold">URBANi.</span>{" "}
              </p>
            </div>
          </div>
          <div className="h-2 w-24 bg-white absolute bottom-0 left-8 left-overlay"></div>
        </div>

        {/* Middle */}
        <div className="col-span-2">
          {/* overlay / circles */}
          <div className="h-1 bg-blue-100 relative top-0 z-15 w-10/12 mx-auto"></div>{" "}
          <div className="relative -top-6 z-16 left-72">
            {" "}
            <div className="bg-blue-100 h-12 w-12 rounded-full flex justify-center items-center">
              {" "}
              <div className="bg-white/80 h-8 w-8 rounded-full flex justify-center items-center">
                {" "}
                <div className="bg-primary h-4 w-4 rounded-full"></div>{" "}
              </div>{" "}
            </div>{" "}
          </div>
          {/* Sonar / Wave effect */}
          <div className="wave w-44 h-18 bg-blue-200 rounded-3xl absolute top-0 right-110 z-25 flex items-center justify-center">
            <div className="w-40 h-14 bg-white rounded-2xl flex items-center gap-2 px-2">
              <div className="avatar-group -space-x-6">
                <div className="avatar">
                  <div className="w-8">
                    <img src="https://img.daisyui.com/images/profile/demo/batperson@192.webp" />
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-8">
                    <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" />
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-8">
                    <img src="https://img.daisyui.com/images/profile/demo/averagebulk@192.webp" />
                  </div>
                </div>
                <div className="avatar avatar-placeholder">
                  <div className="bg-neutral text-neutral-content w-8">
                    <span>+99</span>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-primary font-extrabold leading-2 mt-2 text-lg">
                  150K
                </p>
                <p>users</p>
              </div>
            </div>
          </div>
          <Lottie
            animationData={citySkyline}
            loop
            className="md:w-140 md:h-80 absolute -top-30 ml-12"
          />
        </div>

        {/* Right */}
        {/* Right Side */}
        <div className="col-span-1 relative flex flex-col items-center justify-center px-4 space-y-6">
          <div className="h-2 w-24 bg-white absolute top-0 right-8 right-overlay"></div>
          {/* Card Container */}
          <div className="flex flex-col items-center mt-12 z-30 gap-3">
            {/* Main CTA */}
            <Link
              className="w-full bg-primary hover:bg-blue-800 text-white font-bold py-3 px-5 rounded-xl shadow-lg transition duration-300 transform hover:translate-x-10 text-center"
              to={"/all-issues"}
            >
              Explore Issue
            </Link>

            <button className="w-full bg-white border border-primary text-primary font-semibold py-3 px-5 rounded-xl shadow-sm transition duration-300 transform hover:-translate-x-10 cursor-pointer">
              Track Your Report
            </button>

            {/* Quick Stats */}
            <div>
              <StatsBannerCard />
            </div>

            {/* Trust Badge */}
            {/* <div className="flex items-center space-x-2 mt-4 bg-white/50 rounded-xl px-4 py-2 shadow-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-teal-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m1-5a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-sm font-semibold text-gray-700">
                Verified Staff Handling
              </span>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
