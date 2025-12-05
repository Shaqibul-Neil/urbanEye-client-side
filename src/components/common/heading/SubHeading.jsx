const SubHeading = ({ className, label }) => {
  return (
    <div>
      <h1 className={`text-xl font-medium text-ghost ${className}`}>{label}</h1>
    </div>
  );
};

export default SubHeading;
