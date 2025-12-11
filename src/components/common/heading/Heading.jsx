const Heading = ({ className, label }) => {
  return (
    <div>
      <h2
        className={`font-extrabold text-primary ${className} font-extrabold tracking-tight`}
      >
        {label}
      </h2>
    </div>
  );
};

export default Heading;
