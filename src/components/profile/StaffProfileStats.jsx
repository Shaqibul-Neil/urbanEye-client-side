import { motion } from "framer-motion";
import {
  FaFileAlt,
  FaCheckCircle,
  FaClock,
  FaCalendarAlt,
  FaTrophy,
  FaChartBar,
  FaExclamationTriangle,
} from "react-icons/fa";
import ProfileStatsCard from "./ProfileStatsCard";
import ProfileActivityChart from "./ProfileActivityChart";
import useStaffPerformanceStats from "../../hooks/profile/useStaffPerformanceStats";
import Loading from "../loading/Loading";

const StaffProfileStats = ({ userEmail }) => {
  const { performanceStats, isLoading, isError, error } =
    useStaffPerformanceStats(userEmail);
  //console.log(performanceStats);
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-gray-100 rounded-xl p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-8 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-gray-100 rounded-xl p-6 h-80 animate-pulse"></div>
          <div className="bg-gray-100 rounded-xl p-6 h-80 animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <FaExclamationTriangle className="w-16 h-16 text-red-500 mb-4" />
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Failed to Load Performance Stats
        </h3>
        <p className="text-gray-600 mb-4">
          {error?.message ||
            "Unable to fetch performance statistics. Please try again later."}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!performanceStats) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <FaChartBar className="w-16 h-16 text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          No Data Available
        </h3>
        <p className="text-gray-600">
          Performance statistics are not available at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Performance Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <ProfileStatsCard
          title="Assigned Issues"
          value={performanceStats.assignedIssues || 0}
          subtitle="Total assigned"
          icon={<FaFileAlt className="w-6 h-6" />}
          color="primary"
          delay={0.1}
        />
        <ProfileStatsCard
          title="Resolved"
          value={performanceStats.resolvedIssues || 0}
          subtitle="Successfully completed"
          icon={<FaCheckCircle className="w-6 h-6" />}
          color="success"
          delay={0.2}
        />
        <ProfileStatsCard
          title="Pending"
          value={performanceStats.pendingIssues || 0}
          subtitle="In progress"
          icon={<FaClock className="w-6 h-6" />}
          color="warning"
          delay={0.3}
        />
        <ProfileStatsCard
          title="Avg Resolution"
          value={
            performanceStats.avgResolutionTime > 0
              ? performanceStats.avgResolutionTime
              : "N/A"
          }
          subtitle={
            performanceStats.avgResolutionTime > 0
              ? "Days to resolve"
              : "No data yet"
          }
          icon={<FaCalendarAlt className="w-6 h-6" />}
          color="accent"
          delay={0.4}
        />
      </div>

      {/* Resolution Trend and Performance Indicators */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Resolution Activity Chart */}
        <div className="lg:col-span-2">
          <ProfileActivityChart
            data={performanceStats.resolutionTrend || []}
            title="Resolution Activity (Last 6 Months)"
            color="var(--color-success)"
            delay={0.5}
          />
        </div>

        {/* Performance Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-6">
            Performance Indicators
          </h3>

          <div className="space-y-4">
            <div className="p-4 bg-success/5 rounded-lg border border-success/10">
              <div className="flex items-center gap-3 mb-2">
                <FaTrophy className="w-5 h-5 text-success" />
                <span className="text-sm font-medium text-gray-700">
                  Best Performance Day
                </span>
              </div>
              <p className="text-lg font-semibold text-success">
                {performanceStats.bestPerformanceDay || "N/A"}
              </p>
            </div>

            <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
              <div className="flex items-center gap-3 mb-2">
                <FaChartBar className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-gray-700">
                  Resolution Consistency
                </span>
              </div>
              <p className="text-lg font-semibold text-primary">
                {performanceStats.resolutionConsistency || 0}%
              </p>
            </div>

            {(performanceStats.assignedIssues || 0) > 0 && (
              <div className="p-4 bg-accent/5 rounded-lg border border-accent/10">
                <div className="flex items-center gap-3 mb-2">
                  <FaCheckCircle className="w-5 h-5 text-accent" />
                  <span className="text-sm font-medium text-gray-700">
                    Success Rate
                  </span>
                </div>
                <p className="text-lg font-semibold text-accent">
                  {Math.round(
                    ((performanceStats.resolvedIssues || 0) /
                      (performanceStats.assignedIssues || 1)) *
                      100
                  )}
                  %
                </p>
              </div>
            )}

            {/* Efficiency Badge */}
            <div className="p-4 bg-warning/5 rounded-lg border border-warning/10">
              <div className="flex items-center gap-3 mb-2">
                <FaTrophy className="w-5 h-5 text-warning" />
                <span className="text-sm font-medium text-gray-700">
                  Efficiency Badge
                </span>
              </div>
              <p className="text-lg font-semibold text-warning">
                {(performanceStats.resolutionConsistency || 0) >= 80
                  ? "Excellent"
                  : (performanceStats.resolutionConsistency || 0) >= 60
                  ? "Good"
                  : (performanceStats.resolutionConsistency || 0) >= 40
                  ? "Average"
                  : "Improving"}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StaffProfileStats;
