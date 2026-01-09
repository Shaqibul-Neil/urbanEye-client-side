import globe from "../../../assets/globe.png";
const LeftGlobe = () => {
  return (
    <>
      <div className="relative">
        <img
          src={globe}
          alt=""
          className="w-32 h-32 relative z-10 animate-elasticBounce left-18 top-8"
        />
        {/* Circular shadow */}
        <div className="absolute bottom-4 left-16 w-20 h-20 bg-black/10 rounded-full z-9 animate-elasticBounce top-24" />
        {/* Card content */}
        <div className="absolute top-24 md:left-8 left-0 w-64 bg-white rounded-tr-[100px] z-5 px-5 pt-24 pb-6">
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
    </>
  );
};

export default LeftGlobe;
