import {
  PieChart,
  Pie,
  Label,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const StatusPieChart = ({ data, title = "Status Distribution" }) => {
  // Color mapping for different statuses
  const statusColors = {
    pending: "#FFBB28",
    "in-progress": "#00C49F",
    rejected: "#FF8042",
    resolved: "#0088FE",
    assigned: "#8884d8",
    closed: "#475569",
  };

  // Transform data for pie chart
  const chartData =
    data?.map((item) => ({
      name: item._id || item.status,
      value: item.count,
      fill: statusColors[item._id] || statusColors[item.status] || "#8884d8",
    })) || [];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border">
          <p className="font-semibold capitalize">{data.name}</p>
          <p className="text-sm">Count: {data.value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-84">
      <h3 className="text-lg font-bold mb-4 text-secondary text-center">
        {title}
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart margin={{ top: 10, right: 10, bottom: 30, left: 10 }}>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            outerRadius="80%"
            innerRadius="60%"
            isAnimationActive={false}
          />
          <Label position="center" fill="#666" />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="bottom"
            height={36}
            wrapperStyle={{ fontSize: "12px", paddingTop: "-10px" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatusPieChart;
