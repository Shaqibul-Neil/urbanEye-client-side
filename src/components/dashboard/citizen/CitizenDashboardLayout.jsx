import { FaChartBar, FaCheckCircle, FaClock, FaTimes } from "react-icons/fa";
import MetricCard from "../shared/MetricCard";
import StatusPieChart from "../shared/StatusPieChart";
import ResolutionRateChart from "../shared/ResolutionRateChart";
import TopUpvotedIssue from "../shared/TopUpvotedChart";
import PaymentAreaChart from "../shared/PaymentAreaChart";
import ReusableIssuesTable from "../shared/ReusableIssuesTable";
import { motion, easeOut } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: easeOut,
      delay: 0.3,
    },
  },
};

const CitizenDashboardLayout = ({
  // Metrics data
  totalIssues = 0,
  resolvedIssues = 0,
  statusStats = [],

  // Chart data
  paymentStats,
  topUpvotedIssues = [],

  // Table data
  latestIssues = [],

  // Loading states
  loading = false,

  // Links
  issuesLink = "/dashboard/my-reported-issues",
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
    <div className="space-y-6 max-w-[95%] mx-auto">
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
              delay={0.2}
            />

            {/* Resolved Issues */}

            <MetricCard
              title="Resolved"
              count={resolvedIssues}
              icon={FaCheckCircle}
              textColor="text-green-600"
              bgColor="bg-green-100"
              badgeColor="bg-green-100 border-green-200"
              delay={0.4}
            />

            {/* Pending Issues */}

            <MetricCard
              title="Pending"
              count={pendingIssues}
              icon={FaClock}
              textColor="text-yellow-600"
              bgColor="bg-yellow-100"
              badgeColor="bg-yellow-100 border-yellow-200"
              delay={0.6}
            />

            {/* Rejected Issues */}
            <MetricCard
              title="Rejected"
              count={rejectedIssues}
              icon={FaTimes}
              textColor="text-red-600"
              bgColor="bg-red-100"
              badgeColor="bg-red-100 border-red-200"
              delay={0.8}
            />
          </div>

          {/* Status Distribution Pie Chart (1 Grid) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            {" "}
            <StatusPieChart data={pieChartData} title="Status Distribution" />
          </motion.div>

          {/* Resolution Rate Chart (1 Grid) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <ResolutionRateChart
              totalIssues={totalIssues}
              resolvedIssues={resolvedIssues}
            />
          </motion.div>
        </div>
      </div>

      {/* Section 2: Payment Analytics + Upvotes */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Payment Chart (3 columns) */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="lg:col-span-3"
        >
          {paymentStats && <PaymentAreaChart paymentStats={paymentStats} />}
        </motion.div>

        {/* Top Upvoted Issues (1 column) */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2"
        >
          <TopUpvotedIssue data={topUpvotedIssues} title="Top Upvoted Issue" />
        </motion.div>
      </div>

      {/* Section 3: Latest Posted Issues (Full Width) */}
      <ReusableIssuesTable
        title="Latest Posted Issues"
        data={latestIssues}
        loading={loading}
        viewAllLink={issuesLink}
        limit={3}
        showActions={true}
      />
    </div>
  );
};

export default CitizenDashboardLayout;
