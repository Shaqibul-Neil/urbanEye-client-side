import Heading from "../../../components/common/heading/Heading";
import SubHeading from "../../../components/common/heading/SubHeading";

const ReportIssues = () => {
  return (
    <div className="px-5">
      <div className="space-y-12">
        {/* Title Section */}
        <div className="space-y-2">
          <Heading label={"Report a Public Infrastructure Issue"} />
          <SubHeading
            label={
              "Help us keep the city safe and efficient by reporting issues quickly."
            }
          />
        </div>
        {/* Form Section */}
      </div>
    </div>
  );
};

export default ReportIssues;
