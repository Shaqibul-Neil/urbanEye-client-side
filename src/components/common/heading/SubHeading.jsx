const SubHeading = ({ className, label }) => {
  return (
    <div>
      <h1
        className={`md:text-lg text-base font-medium text-gray-600 ${className}`}
      >
        {label}
      </h1>
    </div>
  );
};

export default SubHeading;
