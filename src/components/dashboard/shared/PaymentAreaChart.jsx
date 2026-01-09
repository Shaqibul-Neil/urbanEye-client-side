import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const PaymentAreaChart = ({ paymentStats }) => {
  // Prepare data
  const chartData = paymentStats?.dateWise?.map((item) => ({
    date: item._id,
    TotalAmount: item.totalAmount,
    numberOfPayments: item.totalPayments,
  }));

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 w-full h-[400px]">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold mb-4 text-secondary w-1/2">
          Payments Overview
        </h3>
        <p className="text-base font-bold text-secondary">
          ৳ {paymentStats?.totalAmount}
        </p>
      </div>
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 30, left: -15, bottom: 0 }}
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
            <YAxis stroke="#6b7280" tick={{ fontSize: 12, fontWeight: 500 }} />
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
              height={36}
              wrapperStyle={{ fontSize: 14, fontWeight: 600 }}
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
