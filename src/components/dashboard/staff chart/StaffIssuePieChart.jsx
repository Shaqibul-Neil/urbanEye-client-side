import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { getBar } from "../../../utilities/getStatusBadge";

const RADIAN = Math.PI / 180;
const COLORS = ["#0088FE", "#22d3ee", "#93c5fd", "#fcd34d", "#4ade80"];

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  if (cx == null || cy == null || innerRadius == null || outerRadius == null) {
    return null;
  }
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const y = cy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${((percent ?? 1) * 100).toFixed(0)}%`}
    </text>
  );
};

const StaffPieChart = ({ issuesAggregate, isAnimationActive = true }) => {
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={issuesAggregate}
            dataKey="count"
            nameKey="_id"
            isAnimationActive={isAnimationActive}
            labelLine={false}
            label={renderCustomizedLabel}
          >
            {issuesAggregate.map((entry, i) => (
              <Cell key={`cell-${entry._id}`} fill={getBar(entry._id)} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StaffPieChart;
