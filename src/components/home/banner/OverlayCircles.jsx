const OverlayCircles = () => {
  return (
    <div className="absolute top-32 left-1/2 -translate-x-1/2 lg:block hidden">
      {" "}
      <div className="bg-blue-100 h-12 w-12 rounded-full flex justify-center items-center">
        {" "}
        <div className="bg-white/80 h-8 w-8 rounded-full flex justify-center items-center">
          {" "}
          <div className="bg-primary h-4 w-4 rounded-full animate-pulse"></div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};

export default OverlayCircles;
