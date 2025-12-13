import Lottie from "lottie-react";
import citySkyline from "../../../lottie/citySkyline.json";
import globe from "../../../assets/globe.png";
import { Link } from "react-router";
import StatsBannerCard from "./StatsBannerCard";
import { Clock, MessageCircle } from "lucide-react";
const Banner = () => {
  return (
    <div className="relative bg-base-200 pt-12 lg:pt-0">
      <h1
        className="transform text-center text-[88px] lg:text-[270px] md:text-[200px] font-black opacity-100 pointer-events-none lg:tracking-[58px] tracking-tighter leading-none bg-linear-to-b from-white to-[#e5edf0]
    bg-clip-text text-transparent lg:pl-9 drop-shadow-[3px_3px_0px_rgba(0,0,0,0.15)]"
      >
        URBANi
      </h1>

      {/* lottie and globe */}
      {/* lg screen block*/}
      <div className="lg:grid lg:grid-cols-4 hidden relative px-8 gap-16 pb-24 ">
        {/* Left Globe*/}
        <div className="lg:col-span-1 relative">
          <div className="relative">
            <img
              src={globe}
              alt=""
              className="w-72 relative z-10 animate-elasticBounce"
            />
            {/* Circular shadow */}
            <div className="absolute bottom-4 left-12 w-32 h-32 bg-blue-100/40 rounded-full z-9 animate-elasticBounce" />
            {/* Card content */}
            <div className="absolute top-24 left-8 w-64 bg-white rounded-tr-[100px] z-5 px-5 pt-24 pb-6">
              <h3 className="text-lg font-black text-primary txt">
                Report fast. Track faster.
              </h3>
              <p className="text-secondary font-light tracking-wider">
                {" "}
                Spotted a city problem? Report it instantly with{" "}
                <span className="text-primary font-bold">URBANi.</span>{" "}
              </p>
            </div>
          </div>
          <div className="h-2 w-24 bg-white absolute -bottom-15 left-8 left-overlay"></div>
        </div>
        {/* Middle Lottie*/}
        <div className="lg:col-span-2">
          {/* overlay / circles */}
          <div className="h-1 bg-blue-100 relative z-15 w-10/12 left-6 top-40 mx-auto"></div>{" "}
          <div className="relative top-33 z-16 left-72">
            {" "}
            <div className="bg-blue-100 h-12 w-12 rounded-full flex justify-center items-center">
              {" "}
              <div className="bg-white/80 h-8 w-8 rounded-full flex justify-center items-center">
                {" "}
                <div className="bg-primary h-4 w-4 rounded-full animate-pulse"></div>{" "}
              </div>{" "}
            </div>{" "}
          </div>
          {/* 150k User */}
          <div className="w-44 h-18 bg-blue-200 rounded-3xl absolute top-0 right-110 z-25 flex items-center justify-center animate-elasticBounce">
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
            className="w-160 h-100 absolute -top-20"
          />
        </div>

        {/* Right Side Badge*/}
        <div className="lg:col-span-1 relative flex flex-col items-center justify-center px-4 space-y-6">
          <div className="h-2 w-24 bg-white right-overlay relative -right-19"></div>
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

      {/* sm and md screen*/}
      <div className="px-8 gap-16 pb-24 lg:hidden md:block">
        {/* Lottie */}
        <div className="relative">
          {/* 150k User */}
          <div className="md:w-44 md:h-18 w-32 h-14 bg-blue-200 rounded-3xl absolute top-20 right-0 z-25 flex items-center justify-center animate-elasticBounce">
            <div className="md:w-40 md:h-14 w-27 h-10 bg-white rounded-2xl flex items-center gap-2 px-2">
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
                <p className="text-primary font-extrabold leading-2 mt-2 md:text-lg text-base">
                  150K
                </p>
                <p>users</p>
              </div>
            </div>
          </div>
          <div className="w-full">
            <Lottie
              animationData={citySkyline}
              loop
              className="w-70 h-50 md:w-full md:h-80"
            />
          </div>
        </div>
        {/* Globe and Badge */}
        <div className="flex justify-between md:flex-row flex-col gap-4">
          {/* Left */}
          <div>
            <div className="relative">
              <img
                src={globe}
                alt=""
                className="w-72 relative z-10 animate-elasticBounce"
              />
              {/* Circular shadow */}
              <div className="absolute bottom-4 left-12 w-32 h-32 bg-blue-100/40 rounded-full z-9 animate-elasticBounce" />
              {/* Card content */}
              <div className="absolute top-24 md:left-8 w-64 bg-white rounded-tr-[100px] z-5 px-5 pt-24 pb-6">
                <h3 className="text-lg font-black text-primary txt">
                  Report fast. Track faster.
                </h3>
                <p className="text-secondary font-light tracking-wider">
                  {" "}
                  Spotted a city problem? Report it instantly with{" "}
                  <span className="text-primary font-bold">URBANi.</span>{" "}
                </p>
              </div>
            </div>
          </div>
          {/* Right */}
          {/* Right Side */}
          <div className="flex flex-col items-center justify-center px-4 space-y-6 mt-24 md:mt-0">
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
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="flex justify-center items-center relative z-10 mb-8">
        <div className="flex justify-center items-center w-64 border-white border rounded-full h-20 wave">
          <div className="flex justify-center items-center w-60 border-primary border rounded-full h-16">
            <Link
              className="w-56 bg-white text-primary font-bold py-3 px-5 rounded-full shadow-lg text-lg transition duration-300 text-center cursor-pointer relative z-12"
              to={"/all-issues"}
            >
              Explore Issue
            </Link>
          </div>
        </div>
      </div>
      {/* Tags and Stats */}
      <div className="relative w-full bg-base-200 rounded-3xl lg:flex lg:justify-between pt-4">
        {/* Left */}
        <div className="col-span-1 bg-white rounded-tl-3xl pt-10 lg:px-15 px-10 space-y-4 lg:w-[35%] w-full pb-10 lg:pb-0 lg:[clip-path:polygon(0_0,89%_0,91%_13%,100%_68%,100%_100%,0_100%)]">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
              <MessageCircle className="h-6 w-6 text-white" />
            </div>
            <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
              <Clock className="h-6 w-6 text-white" />
            </div>
          </div>
          <h3 className="text-secondary font-bold text-lg">
            From potholes to streetlights, your reports help the city act
            faster. Follow your issue in real-time and see transparency in
            action—because civic engagement should be easy and effective.
          </h3>
          <div className="border-primary border w-48 rounded-full bg-base-200 h-10 flex justify-center items-center">
            <p className="text-primary">From Issue to Action</p>
          </div>
        </div>
        {/* middle */}
        <div className="bg-white lg:w-[30%] w-full">
          <div className="bg-base-200 py-8">
            <h2 className="text-6xl text-center font-black text-primary tracking-tighter leading-18">
              Your Voice,
              <br /> Your City
            </h2>{" "}
          </div>
        </div>
        {/* right */}
        <div className="rounded-tr-3xl bg-white p-10 lg:pl-30 space-y-4 lg:w-[35%] lg:[clip-path:polygon(100%_0,11%_0,8%_18%,0_70%,0_100%,100%_100%)]">
          <div className="w-64 border-secondary border rounded-full bg-base-200 h-10 flex justify-center items-center">
            <p className="text-secondary">Citizens Shaping Urban Life </p>
          </div>
          <div className="flex lg:flex-col md:flex-row flex-col gap-2">
            <div className="gap-2 items-center flex">
              <h3 className="text-5xl text-primary font-bold">15K+</h3>
              <p className="text-primary font-light">
                Issues resolved last month
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <h3 className="text-5xl text-primary font-bold">90K</h3>
              <p className="text-primary font-light">Issues closed last year</p>
            </div>
            <div className="flex gap-2 items-center">
              <h3 className="text-5xl text-primary font-bold">10K</h3>
              <p className="text-primary font-light">
                Issues reported this month
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
