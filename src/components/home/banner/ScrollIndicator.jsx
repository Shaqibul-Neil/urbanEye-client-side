const ScrollIndicator = () => {
  return (
    <div className="absolute left-1/2 top-50 -translate-x-1/2 lg:flex flex-col items-center gap-2 opacity-90 hidden">
      {/* Mouse */}
      <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center relative overflow-hidden">
        <span className="absolute top-2 w-1.5 h-2.5 bg-primary rounded-full scroll-dot"></span>
      </div>

      {/* Text */}
      <p className="text-xs tracking-widest text-primary uppercase">scroll</p>
    </div>
  );
};

export default ScrollIndicator;
