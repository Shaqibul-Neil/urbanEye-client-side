import globe from "../../../assets/globe.png";
const LeftGlobe = () => {
  return (
    <>
      <div className="relative">
        <img
          src={globe}
          alt=""
          className="w-72 relative z-10 animate-elasticBounce"
        />
        {/* Circular shadow */}
        <div className="absolute bottom-4 left-12 w-32 h-32 bg-blue-100/40 rounded-full z-9 animate-elasticBounce" />
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
