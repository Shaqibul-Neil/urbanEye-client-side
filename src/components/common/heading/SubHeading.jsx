const SubHeading = ({ className, label }) => {
  return (
    <div>
      <h1
        className={`md:text-xl text-lg font-medium text-gray-600 ${className}`}
      >
        {label}
      </h1>
    </div>
  );
};

export default SubHeading;
