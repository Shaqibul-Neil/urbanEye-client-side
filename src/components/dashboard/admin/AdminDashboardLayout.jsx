import { FaChartBar, FaCheckCircle, FaClock, FaTimes } from "react-icons/fa";
import MetricCard from "../shared/MetricCard";
import StatusPieChart from "../shared/StatusPieChart";
import ResolutionRateChart from "../shared/ResolutionRateChart";
import TopUpvotedIssue from "../shared/TopUpvotedChart";
import PaymentAreaChart from "../shared/PaymentAreaChart";
import AdminIssuesTable from "./AdminIssuesTable";
import AdminUsersTable from "./AdminUsersTable";

const AdminDashboardLayout = ({
  // Metrics data
  totalIssues = 0,
  resolvedIssues = 0,
  statusStats = [],

  // Chart data
  paymentStats,
  topUpvotedIssues = [],

  // Table data
  latestIssues = [],
  latestUsers = [],

  // Loading states
  loading = false,
}) => {
  // Calculate metrics
  const pendingIssues =
    statusStats?.find((s) => s._id === "pending")?.count || 0;
  const rejectedIssues =
    statusStats?.find((s) => s._id === "rejected")?.count || 0;

  // Filter status stats for pie chart (exclude resolved for separate display)
  const pieChartData = statusStats?.filter((s) => s._id !== "resolved") || [];

  if (loading) {
    return (
      <div className="px-5">
        <div className="animate-pulse space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-40 bg-gray-200 rounded-2xl"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3 h-64 bg-gray-200 rounded-2xl"></div>
            <div className="h-64 bg-gray-200 rounded-2xl"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-5 space-y-6">
      {/* Section 1: Issue Metrics (4 Grid Layout) */}
      <div className="bg-white p-6 rounded-3xl">
        <h2 className="text-lg text-secondary font-bold mb-4">
          Issue Metrics
          <span className="font-normal text-base ml-2">
            Total Submitted Issues: {totalIssues}
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left 2 Grids: Cards in 2x2 Layout */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-2 gap-4">
            {/* Total Issues */}
            <MetricCard
              title="Issues"
              count={totalIssues}
              icon={FaChartBar}
              textColor="text-blue-600"
              bgColor="bg-blue-100"
              badgeColor="bg-blue-100 border-blue-200"
            />

            {/* Resolved Issues */}
            <MetricCard
              title="Resolved"
              count={resolvedIssues}
              icon={FaCheckCircle}
              textColor="text-green-600"
              bgColor="bg-green-100"
              badgeColor="bg-green-100 border-green-200"
            />

            {/* Pending Issues */}
            <MetricCard
              title="Pending"
              count={pendingIssues}
              icon={FaClock}
              textColor="text-yellow-600"
              bgColor="bg-yellow-100"
              badgeColor="bg-yellow-100 border-yellow-200"
            />

            {/* Rejected Issues */}
            <MetricCard
              title="Rejected"
              count={rejectedIssues}
              icon={FaTimes}
              textColor="text-red-600"
              bgColor="bg-red-100"
              badgeColor="bg-red-100 border-red-200"
            />
          </div>

          {/* Status Distribution Pie Chart (1 Grid) */}
          <StatusPieChart data={pieChartData} title="Status Distribution" />

          {/* Resolution Rate Chart (1 Grid) */}
          <ResolutionRateChart
            totalIssues={totalIssues}
            resolvedIssues={resolvedIssues}
          />
        </div>
      </div>

      {/* Section 2: Payment Analytics + Upvotes */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Payment Chart (3 columns) */}
        <div className="lg:col-span-3">
          {paymentStats && <PaymentAreaChart paymentStats={paymentStats} />}
        </div>

        {/* Top Upvoted Issues (1 column) */}
        <div className="lg:col-span-2">
          <TopUpvotedIssue data={topUpvotedIssues} title="Top Upvoted Issue" />
        </div>
      </div>

      {/* Section 3: Latest Issues (Full Width) */}
      <AdminIssuesTable
        title="Latest Posted Issues"
        data={latestIssues}
        loading={loading}
      />

      {/* Section 4: Latest Citizens (Full Width) */}
      <AdminUsersTable
        title="Latest Citizens"
        data={latestUsers}
        loading={loading}
      />
    </div>
  );
};

export default AdminDashboardLayout;
