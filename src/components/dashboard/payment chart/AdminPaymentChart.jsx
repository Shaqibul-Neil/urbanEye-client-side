import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AdminPaymentChart = ({ paymentStats }) => {
  // Prepare data
  const chartData = paymentStats?.dateWise?.map((item) => ({
    date: item._id,
    TotalAmount: item.totalAmount,
    numberOfPayments: item.totalPayments,
  }));

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 w-full h-[400px]">
      <h3 className="text-xl font-bold mb-4 text-gray-800">
        Payments Overview
      </h3>
      <div className="flex justify-between">
        <h3 className="text-lg font-semibold mb-2">Total Revenue</h3>
        <p className="text-2xl font-bold">৳ {paymentStats?.totalAmount}</p>
      </div>

      <ResponsiveContainer width="100%" height="80%">
        <LineChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
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
          <Line
            type="monotone"
            dataKey="TotalAmount"
            name="Total Amount"
            stroke="#2563eb"
            strokeWidth={3}
            activeDot={{ r: 8, stroke: "#2563eb", strokeWidth: 2 }}
          />
          <Line
            type="monotone"
            dataKey="numberOfPayments"
            name="Number of Payments"
            stroke="#10b981"
            strokeWidth={3}
            activeDot={{ r: 8, stroke: "#10b981", strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AdminPaymentChart;
