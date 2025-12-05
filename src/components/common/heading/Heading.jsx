const Heading = ({ className, label }) => {
  return (
    <div>
      <h1
        className={`text-4xl font-extrabold text-secondary leading-tight ${className}`}
      >
        {label}
      </h1>
    </div>
  );
};

export default Heading;
