import {
  Bar,
  BarChart,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getBar } from "../../../utilities/getStatusBadge";

const StaffIssueChart = ({ issuesAggregate }) => {
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={issuesAggregate}
          margin={{ top: 0, right: 0, left: -30, bottom: 5 }}
        >
          <XAxis
            dataKey="_id"
            interval={0}
            tick={{
              angle: -10,
              fontSize: 10,
              dx: -5,
              dy: 5,
            }}
          />
          <YAxis />
          <Tooltip />

          <Bar dataKey="count">
            {issuesAggregate.map((entry) => (
              <Cell key={entry._id} fill={getBar(entry._id) || "#8884d8"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StaffIssueChart;
