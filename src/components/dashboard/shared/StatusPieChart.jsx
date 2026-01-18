import {
  PieChart,
  Pie,
  Label,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    //console.log(active, payload);
    const entry = payload[0];
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border">
        <p className="font-semibold capitalize">{entry.name}</p>
        <p className="text-sm">Count: {entry.value}</p>
      </div>
    );
  }
  return null;
};

const StatusPieChart = ({
  data,
  title = "Status Distribution",
  totalIssues,
}) => {
  //console.log(data);
  // Color mapping for different statuses
  const statusColors = {
    pending: "#f59e0b",
    "in-progress": "#10b981",
    working: "#090979",
    rejected: "#ef4444",
    resolved: "#0088FE",
    assigned: "#090979",
    closed: "#475569",
  };

  // Transform data for pie chart
  const chartData =
    data?.map((item) => ({
      name: item._id || item.status,
      value: item.count,
      fill: statusColors[item._id] || statusColors[item.status] || "#8884d8",
    })) || [];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-[336px]">
      <h3 className="text-lg font-bold mb-4 text-secondary text-center">
        {title}
      </h3>

      <ResponsiveContainer width="100%" height={300} minHeight={250}>
        <PieChart margin={{ top: 10, right: 10, bottom: 30, left: 10 }}>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            outerRadius="80%"
            innerRadius="60%"
            isAnimationActive={false}
          >
            <Label
              position="center"
              fill="#666"
              value={totalIssues}
              className="text-xl font-bold fill-gray-700"
            />
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="bottom"
            height={64}
            wrapperStyle={{ fontSize: "11px", marginTop: "-10px" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatusPieChart;
