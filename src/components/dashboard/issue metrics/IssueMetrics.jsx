import { FaChartBar } from "react-icons/fa";

const IssueMetrics = ({ resolvedStats }) => {
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between h-40 group hover:shadow-md transition-all duration-300 relative overflow-hidden">
        {/* Faded Background Icon */}
        <div className="absolute top-0 right-0 p-4 opacity-5">
          <FaChartBar size={80} className="text-primary rotate-12" />
        </div>

        {/* Top Section */}
        <div className="flex justify-between items-start z-10">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <FaChartBar size={18} />
          </div>

          <span className="text-[10px] font-bold text-primary uppercase tracking-wider bg-primary/10 px-2 py-1 rounded-full border border-primary/20">
            Issue Metric
          </span>
        </div>

        {/* Bottom Section */}
        <div className="z-10 mt-auto">
          <div className="text-4xl font-extrabold text-gray-900 tracking-tight">
            {resolvedStats.count}
          </div>
          <div className="text-xs font-semibold text-gray-500 mt-1 capitalize">
            {/* {resolvedStats._id.replace("-", " ")} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueMetrics;
