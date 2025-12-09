const Heading = ({ className, label }) => {
  return (
    <div>
      <h2
        className={`font-extrabold text-gradient bg-linear-to-r from-[#2563eb] via-[#38bdf8] to-[#10b981] bg-clip-text text-transparent ${className}`}
      >
        {label}
      </h2>
    </div>
  );
};

export default Heading;
