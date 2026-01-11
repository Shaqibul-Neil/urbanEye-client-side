import { motion } from "framer-motion";
import {
  FaFileAlt,
  FaCheckCircle,
  FaClock,
  FaCalendarAlt,
  FaTag,
  FaExclamationTriangle,
  FaChartBar,
} from "react-icons/fa";
import ProfileStatsCard from "./ProfileStatsCard";
import ProfileActivityChart from "./ProfileActivityChart";
import useUserStats from "../../hooks/profile/useUserStats";
import Loading from "../loading/Loading";

const CitizenProfileStats = ({ userEmail }) => {
  const { userStats, isLoading, isError, error } = useUserStats(userEmail);
  //console.log(userStats);
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
          Failed to Load Activity Stats
        </h3>
        <p className="text-gray-600 mb-4">
          {error?.message ||
            "Unable to fetch your activity statistics. Please try again later."}
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

  if (!userStats) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <FaChartBar className="w-16 h-16 text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          No Activity Data
        </h3>
        <p className="text-gray-600">
          Your activity statistics are not available at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <ProfileStatsCard
          title="Total Issues"
          value={userStats.totalIssues || 0}
          subtitle="Issues reported"
          icon={<FaFileAlt className="w-6 h-6" />}
          color="primary"
          delay={0.1}
        />
        <ProfileStatsCard
          title="Resolved"
          value={userStats.resolvedIssues || 0}
          subtitle="Successfully resolved"
          icon={<FaCheckCircle className="w-6 h-6" />}
          color="success"
          delay={0.2}
        />
        <ProfileStatsCard
          title="Pending"
          value={userStats.pendingIssues || 0}
          subtitle="Awaiting resolution"
          icon={<FaClock className="w-6 h-6" />}
          color="warning"
          delay={0.3}
        />
        <ProfileStatsCard
          title="Avg Resolution"
          value={
            userStats.avgResolutionTime > 0
              ? userStats.avgResolutionTime
              : "N/A"
          }
          subtitle={
            userStats.avgResolutionTime > 0 ? "Days to resolve" : "No data yet"
          }
          icon={<FaCalendarAlt className="w-6 h-6" />}
          color="accent"
          delay={0.4}
        />
      </div>

      {/* Activity Trend and Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Chart */}
        <div className="lg:col-span-2">
          <ProfileActivityChart
            data={userStats.activityTrend || []}
            title="Activity Trend (Last 6 Months)"
            color="var(--color-primary)"
            delay={0.5}
          />
        </div>

        {/* Engagement Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-6">
            Engagement Insights
          </h3>

          <div className="space-y-4">
            <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
              <div className="flex items-center gap-3 mb-2">
                <FaCalendarAlt className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-gray-700">
                  Most Active Month
                </span>
              </div>
              <p className="text-lg font-semibold text-primary">
                {userStats.mostActiveMonth || "N/A"}
              </p>
            </div>

            <div className="p-4 bg-accent/5 rounded-lg border border-accent/10">
              <div className="flex items-center gap-3 mb-2">
                <FaTag className="w-5 h-5 text-accent" />
                <span className="text-sm font-medium text-gray-700">
                  Top Category
                </span>
              </div>
              <p className="text-lg font-semibold text-accent capitalize">
                {userStats.mostCommonCategory || "N/A"}
              </p>
            </div>

            {(userStats.totalIssues || 0) > 0 && (
              <div className="p-4 bg-success/5 rounded-lg border border-success/10">
                <div className="flex items-center gap-3 mb-2">
                  <FaCheckCircle className="w-5 h-5 text-success" />
                  <span className="text-sm font-medium text-gray-700">
                    Resolution Rate
                  </span>
                </div>
                <p className="text-lg font-semibold text-success">
                  {Math.round(
                    ((userStats.resolvedIssues || 0) /
                      (userStats.totalIssues || 1)) *
                      100
                  )}
                  %
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CitizenProfileStats;
