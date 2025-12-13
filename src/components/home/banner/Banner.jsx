import Lottie from "lottie-react";
import citySkyline from "../../../lottie/citySkyline.json";
import globe from "../../../assets/globe.png";
import { Link } from "react-router";
import { Clock, MessageCircle } from "lucide-react";
const Banner = () => {
  const scrollToLatest = () => {
    const element = document.getElementById("latest-section");
    element?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="relative bg-base-200 pt-12 lg:pt-0 overflow-hidden">
      {/* lottie background */}
      <Lottie
        animationData={citySkyline}
        loop
        className="absolute
    left-0 right-0
    top-24 lg:-top-20
    w-full
    h-[420px] md:h-[520px] lg:h-full
    opacity-25
    pointer-events-none"
      />
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
          <div className="h-2 w-24 bg-white absolute -bottom-35 left-8 left-overlay"></div>
        </div>
        {/* Middle border*/}
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
          <div className="w-44 h-18 bg-blue-200 rounded-3xl absolute top-0 right-110 z-25 flex items-center justify-center">
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
          <div className="w-44 h-18 bg-blue-200 rounded-3xl absolute top-13 right-100 z-24 flex items-center justify-center">
            <div className="w-40 h-14 bg-white rounded-2xl flex items-center gap-2 px-2">
              <div className="avatar-group -space-x-6">
                <div className="avatar">
                  <div className="w-8">
                    <img src="https://randomuser.me/api/portraits/women/45.jpg" />
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-8">
                    <img src="https://randomuser.me/api/portraits/men/32.jpg" />
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-8">
                    <img src="https://randomuser.me/api/portraits/women/48.jpg" />
                  </div>
                </div>
                <div className="avatar avatar-placeholder">
                  <div className="bg-neutral text-neutral-content w-8">
                    <span>+25</span>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-primary font-extrabold leading-2 mt-2 text-lg">
                  25K
                </p>
                <p>issues</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Badge*/}
        <div className="lg:col-span-1 relative flex flex-col items-center justify-center px-4 space-y-6">
          <div className="h-2 w-24 bg-white right-overlay relative -right-19"></div>
          {/* Card Container */}
          <div className="glass-card relative p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/20 shadow-xl hover:scale-105 transition-transform duration-300 top-8">
            <Clock className="h-6 w-6 text-primary absolute top-4 left-4" />
            <h3 className="text-primary text-lg font-bold mt-8">
              Track Your Impact <br /> in Real Time
            </h3>
            <p className="text-secondary text-sm mt-2 ">
              5 issues resolved today
            </p>
            <button
              className="mt-3 bg-blue-200 text-primary px-4 py-2 rounded-full transition-all duration-300 hover:bg-white/80 cursor-pointer"
              onClick={scrollToLatest}
            >
              See Details
            </button>
            <div className="w-3 h-3 bg-primary rounded-full animate-pulse absolute bottom-4 right-4"></div>
          </div>
        </div>
      </div>

      {/* sm and md screen*/}
      <div className="px-8 gap-16 pb-24 lg:hidden md:block">
        {/* badge */}
        <div className="relative">
          {/* 150k User */}
          <div className="md:w-44 md:h-18 w-36 h-18 bg-blue-200 rounded-3xl absolute md:right-100 -right-8 z-25 flex items-center justify-center animate-elasticBounce md:top-10 top-8">
            <div className="md:w-40 md:h-14 w-32 h-14 bg-white rounded-2xl flex items-center gap-2 px-2">
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
          <div className="md:w-44 md:h-18 w-36 h-18 bg-blue-200 rounded-3xl absolute right-0 z-24 flex items-center justify-center md:top-16 top-80 animate-elasticBounce">
            <div className="md:w-40 md:h-14 w-32 h-14 bg-white rounded-2xl flex items-center gap-2 px-2">
              <div className="avatar-group -space-x-6">
                <div className="avatar">
                  <div className="w-8">
                    <img src="https://randomuser.me/api/portraits/women/45.jpg" />
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-8">
                    <img src="https://randomuser.me/api/portraits/men/32.jpg" />
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-8">
                    <img src="https://randomuser.me/api/portraits/women/48.jpg" />
                  </div>
                </div>
                <div className="avatar avatar-placeholder">
                  <div className="bg-neutral text-neutral-content w-8">
                    <span>+25</span>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-primary font-extrabold leading-2 mt-2 text-lg">
                  25K
                </p>
                <p>issues</p>
              </div>
            </div>
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
          <div className="flex flex-col items-center justify-center px-4 space-y-6 mt-24 md:mt-16">
            {/* Card Container */}
            <div className="glass-card relative p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/20 shadow-xl hover:scale-105 transition-transform duration-300 top-12">
              <Clock className="h-6 w-6 text-primary absolute top-4 left-4" />
              <h3 className="text-primary text-lg font-bold mt-8">
                Track Your Impact <br /> in Real Time
              </h3>
              <p className="text-secondary text-sm mt-2 ">
                5 issues resolved today
              </p>
              <button
                className="mt-3 bg-blue-200 text-primary px-4 py-2 rounded-full transition-all duration-300 hover:bg-white/80 cursor-pointer"
                onClick={scrollToLatest}
              >
                See Details
              </button>
              <div className="w-3 h-3 bg-primary rounded-full animate-pulse absolute bottom-4 right-4"></div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="flex justify-center items-center relative z-10 mb-8">
        <div className="flex justify-center items-center w-64 border-white border rounded-full h-20 wave">
          <div className="flex justify-center items-center w-60 border-primary border rounded-full h-16">
            <Link
              className="w-56 bg-white text-primary font-bold py-3 px-5 rounded-full shadow-lg text-lg transition duration-300 text-center cursor-pointer relative z-12 hover:bg-primary hover:text-white"
              to={"/all-issues"}
            >
              Explore Issue
            </Link>
          </div>
        </div>
      </div>
      {/* Tags and Stats */}
      <div className="relative w-full bg-base-200 rounded-3xl lg:flex lg:justify-between">
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
