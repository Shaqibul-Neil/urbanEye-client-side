import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FaChartBar } from "react-icons/fa";
import { useEffect, useState } from "react";

const ProfileActivityChart = ({
  data,
  title,
  color = "#2563eb",
  delay = 0,
}) => {
  //responsive x-axis text
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640); // tailwind sm breakpoint
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle empty or invalid data
  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.6 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-6">{title}</h3>

        <div className="h-64 flex flex-col items-center justify-center text-gray-400">
          <FaChartBar className="w-16 h-16 mb-4" />
          <p className="text-lg font-medium">No Data Available</p>
          <p className="text-sm">Chart will appear when data is available</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      className="bg-white rounded-xl md:p-6 p-4 shadow-sm border border-gray-100"
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-6">{title}</h3>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: -20,
              bottom: isMobile ? 40 : 20,
            }}
          >
            {/* <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" /> */}
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              interval={isMobile ? "preserveStartEnd" : 0}
              angle={isMobile ? -35 : 0}
              textAnchor={isMobile ? "end" : "middle"}
              height={isMobile ? 50 : 30}
              tick={{
                fontSize: isMobile ? 9 : 11,
                fill: "#64748b",
              }}
              tickFormatter={(value) =>
                isMobile ? value.split(" ")[0] : value
              }
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "#64748b" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Bar
              dataKey="count"
              fill={color}
              radius={[4, 4, 0, 0]}
              fillOpacity={0.8}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default ProfileActivityChart;
