import banner from "../../../assets/banner.png";
import HomeNavbar from "../../common/navbar/HomeNavbar";
import BannerHeading from "./BannerHeading";
import CTA from "./CTA";
import RightCard from "./RightCard";
import UserStat from "./UserStat";

const Banner = () => {
  return (
    <section
      className="relative w-full bg-cover bg-center lg:mb-16 md:mb-20 mb-24 object-cover py-24"
      style={{
        backgroundImage: `url(${banner})`,
      }}
    >
      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/40"></div>
      <header className="fixed w-full pt-2 left-0 top-0 z-[1000]">
        <div className="container mx-auto lg:px-6 rounded-full bg-black/40 backdrop-blur-xl  w-full z-50">
          <HomeNavbar variant="home" />
        </div>
      </header>
      <BannerHeading />
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between h-full px-8 md:px-16 pt-16">
        {/* Left Content */}
        <div className="text-white mb-8 md:mb-0 space-y-4">
          <h2 className="text-5xl font-black tracking-tighter">
            Your Voice, Your City
          </h2>{" "}
          <p className="text-lg md:text-xl max-w-md">
            From potholes to streetlights, your reports help the city act
            faster. Transforming public infrastructure with modern,
            citizen-centric solutions.
          </p>
          <CTA />
        </div>

        {/* Right Content */}
        <div className="text-white flex flex-col gap-4 items-end">
          {/* Issue stats */}
          <div className="flex gap-4">
            <div className="p-4 bg-white rounded-4xl">
              <div>
                <h3 className="text-4xl text-black font-bold text-center">
                  95%
                </h3>
                <p className="text-center text-black font-semibold">
                  Issues resolved <br />
                  last month
                </p>
              </div>
            </div>

            <div className="px-8 py-4 bg-white rounded-4xl">
              <div>
                <h3 className="text-4xl text-black font-bold text-center">
                  10K
                </h3>
                <p className="text-center text-black font-semibold">
                  Issues <br /> reported
                </p>
              </div>
            </div>
          </div>
          {/* user stats */}
          <UserStat />
        </div>
      </div>
    </section>
  );
};

export default Banner;
