import {
  Pie,
  PieChart,
  ResponsiveContainer,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const ResolutionRateChart = ({ totalIssues, resolvedIssues }) => {
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
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-84">
      <h3 className="text-lg font-bold mb-2 text-secondary text-center">
        Resolution Rate
      </h3>
      <p className="text-center text-2xl font-bold text-primary mb-4">
        {resolutionRate}%
      </p>

      <ResponsiveContainer width="100%" height="70%">
        <PieChart>
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
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ResolutionRateChart;
