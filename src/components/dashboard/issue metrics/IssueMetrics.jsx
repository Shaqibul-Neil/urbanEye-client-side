import { getBg } from "../../../utilities/getStatusBadge";

const IssueMetrics = ({ stat }) => {
  return (
    <div
      className={`relative p-6 rounded-3xl shadow-2xl flex flex-col items-center justify-center transition-transform duration-500 hover:scale-105 ${getBg(
        stat._id
      )} text-secondary`}
    >
      <p className="text-xl md:text-base capitalize tracking-wide font-medium">
        {stat._id.replace("-", " ")}
      </p>
      {/* Count */}
      <h4 className="text-2xl font-extrabold mb-2 mt-1">{stat.count}</h4>
    </div>
  );
};

export default IssueMetrics;
