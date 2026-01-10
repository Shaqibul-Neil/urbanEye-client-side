import {
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Cell,
  Legend,
  Tooltip,
} from "recharts";
import { PieChart } from "lucide-react";

const CityPulseResolutionRateChart = ({ totalIssues, resolvedIssues }) => {
  const resolvedCount = resolvedIssues || 0;
  const pendingCount = (totalIssues || 0) - resolvedCount;

  const data = [
    { name: "Resolved", value: resolvedCount, fill: "#10b981" },
    { name: "Pending", value: pendingCount, fill: "#f59e0b" },
  ];

  const resolutionRate =
    totalIssues > 0 ? ((resolvedCount / totalIssues) * 100).toFixed(1) : 0;

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      const percentage =
        totalIssues > 0 ? ((data.value / totalIssues) * 100).toFixed(1) : 0;
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border">
          <p className="font-semibold">{data.name}</p>
          <p className="text-sm">Count: {data.value}</p>
          <p className="text-sm">Percentage: {percentage}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-sm border border-white/30 relative overflow-hidden md:w-1/2">
      {/* Premium Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 via-emerald-50/30 to-teal-50/50"></div>

      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
            <PieChart size={24} className="text-white" />
          </div>
          <div>
            <h3 className="text-xl font-black text-gray-800">
              Resolution Rate
            </h3>
            <p className="text-sm text-gray-500 font-medium">
              Overall completion percentage
            </p>
          </div>
        </div>

        <p className="text-center text-4xl font-black text-green-600 mb-6">
          {resolutionRate}%
        </p>

        <ResponsiveContainer width="100%" height={200} minHeight={200}>
          <RechartsPieChart>
            <Pie
              data={data}
              innerRadius="50%"
              outerRadius="90%"
              cornerRadius="10%"
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="bottom"
              height={36}
              wrapperStyle={{ fontSize: "12px" }}
            />
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CityPulseResolutionRateChart;
