import { FaChartBar, FaCheckCircle, FaClock, FaTimes } from "react-icons/fa";
import MetricCard from "../shared/MetricCard";
import StatusPieChart from "../shared/StatusPieChart";
import ResolutionRateChart from "../shared/ResolutionRateChart";
import StaffTasksTable from "./StaffTasksTable";
import { motion } from "framer-motion";

const StaffDashboardLayout = ({
  // Metrics data
  totalIssues = 0,
  resolvedIssues = 0,
  statusStats = [],

  // Table data
  todayTasks = [],
  completedTasks = [],

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
          <div className="h-64 bg-gray-200 rounded-2xl"></div>
          <div className="h-64 bg-gray-200 rounded-2xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-5 space-y-6">
      {/* Section 1: Issue Metrics (4 Grid Layout) */}
      <div className="bg-white p-6 rounded-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="flex items-center gap-4 mb-4"
        >
          <div className="w-1 h-8 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h2 className="text-lg text-secondary font-bold">Issue Metrics</h2>
        </motion.div>

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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {/* Status Distribution Pie Chart (1 Grid) */}
            <StatusPieChart data={pieChartData} title="Status Distribution" />
          </motion.div>
          {/* Resolution Rate Chart (1 Grid) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <ResolutionRateChart
              totalIssues={totalIssues}
              resolvedIssues={resolvedIssues}
            />
          </motion.div>
        </div>
      </div>

      {/* Section 2: Today's Assigned Tasks (Full Width) */}
      <StaffTasksTable
        title="Latest Assigned Tasks"
        data={todayTasks}
        loading={loading}
      />

      {/* Section 3: Recently Completed Tasks (Full Width) */}
      <StaffTasksTable
        title="Recently Completed Tasks"
        data={completedTasks}
        loading={loading}
      />
    </div>
  );
};

export default StaffDashboardLayout;
