import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

const PaymentAreaChart = ({ paymentStats }) => {
  // Prepare data
  const chartData = paymentStats?.dateWise?.map((item) => ({
    date: item._id,
    TotalAmount: item.totalAmount,
    numberOfPayments: item.totalPayments,
  }));

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 w-full h-[400px]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="flex items-center gap-4 mb-4"
      >
        <div className="w-1 h-8 bg-gradient-to-b from-primary to-accent rounded-full"></div>
        <div className="flex justify-between items-center w-full">
          <h3 className="text-xl font-bold text-secondary w-1/2">
            Payments Overview
          </h3>
          <p className="text-base font-bold text-secondary">
            ৳ {paymentStats?.totalAmount}
          </p>
        </div>
      </motion.div>
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 30, left: -25, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="colorPayments" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1e293b" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#1e293b" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <XAxis
              dataKey="date"
              stroke="#6b7280"
              tick={{ fontSize: 12, fontWeight: 500 }}
            />
            <YAxis stroke="#6b7280" tick={{ fontSize: 10, fontWeight: 500 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#f9fafb",
                borderRadius: "12px",
                border: "1px solid #e5e7eb",
                padding: "10px",
                fontSize: "14px",
              }}
            />
            <Legend
              verticalAlign="top"
              height={60}
              wrapperStyle={{ fontSize: 12, fontWeight: 700 }}
            />
            <Area
              type="monotone"
              dataKey="TotalAmount"
              name="Total Amount"
              stroke="#2563eb"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorAmount)"
            />
            <Area
              type="monotone"
              dataKey="numberOfPayments"
              name="Number of Payments"
              stroke="#1e293b"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorPayments)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PaymentAreaChart;
