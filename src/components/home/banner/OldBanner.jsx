import Lottie from "lottie-react";
import citySkyline from "../../../lottie/citySkyline.json";
import LeftGlobe from "./LeftGlobe";
import ZigZag from "./ZigZag";
import OverlayCircles from "./OverlayCircles";
import ScrollIndicator from "./ScrollIndicator";
import UserStat from "./UserStat";
import BannerHeading from "./BannerHeading";
import RightCard from "./RightCard";
import CTA from "./CTA";
import Tags from "./Tags";

const OldBanner = () => {
  return (
    <div className="relative bg-base-200 pt-16 lg:pt-12 overflow-hidden">
      {/* lottie background */}
      <Lottie
        animationData={citySkyline}
        loop
        className="absolute
    left-0 right-0
    top-24 lg:-top-20
    w-full
    h-[420px] md:h-[520px] lg:h-full
    opacity-45
    pointer-events-none"
      />
      {/* Big Heading */}
      <BannerHeading />
      {/* lottie and globe */}
      <div className="grid lg:grid-cols-4 relative px-8 gap-16 pb-24 -mt-8">
        {/* Left Globe*/}
        <div className="lg:col-span-1 relative">
          <LeftGlobe />
        </div>
        {/* Middle border*/}
        <div className="lg:col-span-2 relative">
          {/* Zigzag line */}
          <ZigZag />
          {/* overlay / circles */}
          <OverlayCircles />
          {/* Scroll Indicator */}
          <ScrollIndicator />
          {/* 150k User */}
          <UserStat />
        </div>

        {/* Right Side Badge*/}
        <div className="lg:col-span-1 relative flex flex-col items-center justify-center px-4 space-y-6">
          {/* Card Container */}
          <RightCard />
        </div>
      </div>

      {/* sm and md screen*/}

      {/* CTA */}
      <div className="flex justify-center items-center relative z-10 mb-8 md:-mt-32 lg:mt-0 my-24">
        <CTA />
      </div>
      {/* Tags and Stats */}
      <Tags />
    </div>
  );
};

export default OldBanner;
