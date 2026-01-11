import { motion } from "framer-motion";
import {
  FaFileAlt,
  FaCheckCircle,
  FaUsers,
  FaChartBar,
  FaClock,
  FaShieldAlt,
  FaExclamationTriangle,
} from "react-icons/fa";
import ProfileStatsCard from "./ProfileStatsCard";
import ProfileActivityChart from "./ProfileActivityChart";
import useAdminPlatformStats from "../../hooks/profile/useAdminPlatformStats";
import Loading from "../loading/Loading";

const AdminProfileStats = () => {
  const { platformStats, isLoading, isError, error } = useAdminPlatformStats();
  //console.log(platformStats);
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
          Failed to Load Platform Stats
        </h3>
        <p className="text-gray-600 mb-4">
          {error?.message ||
            "Unable to fetch platform statistics. Please try again later."}
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

  if (!platformStats) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <FaChartBar className="w-16 h-16 text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          No Data Available
        </h3>
        <p className="text-gray-600">
          Platform statistics are not available at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Platform Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <ProfileStatsCard
          title="Total Issues"
          value={platformStats.totalIssuesManaged || 0}
          subtitle="Platform-wide"
          icon={<FaFileAlt className="w-6 h-6" />}
          color="primary"
          delay={0.1}
        />
        <ProfileStatsCard
          title="Resolved Issues"
          value={platformStats.totalResolved || 0}
          subtitle="Successfully closed"
          icon={<FaCheckCircle className="w-6 h-6" />}
          color="success"
          delay={0.2}
        />
        <ProfileStatsCard
          title="Active Staff"
          value={platformStats.activeStaffCount || 0}
          subtitle="Team members"
          icon={<FaUsers className="w-6 h-6" />}
          color="accent"
          delay={0.3}
        />
        <ProfileStatsCard
          title="Participation"
          value={`${platformStats.citizenParticipationRate || 0}%`}
          subtitle="Citizen engagement"
          icon={<FaChartBar className="w-6 h-6" />}
          color="warning"
          delay={0.4}
        />
      </div>

      {/* Platform Activity and System Health */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Platform Activity Chart */}
        <div className="lg:col-span-2">
          <ProfileActivityChart
            data={platformStats.platformActivityTrend || []}
            title="Platform Activity Trend (Last 6 Months)"
            color="var(--color-primary)"
            delay={0.5}
          />
        </div>

        {/* System Health */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-6">
            System Health
          </h3>

          <div className="space-y-4">
            <div className="p-4 bg-success/5 rounded-lg border border-success/10">
              <div className="flex items-center gap-3 mb-2">
                <FaCheckCircle className="w-5 h-5 text-success" />
                <span className="text-sm font-medium text-gray-700">
                  Resolution Rate
                </span>
              </div>
              <p className="text-2xl font-bold text-success">
                {platformStats.resolutionRate || 0}%
              </p>
            </div>

            <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
              <div className="flex items-center gap-3 mb-2">
                <FaClock className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-gray-700">
                  Avg Resolution Time
                </span>
              </div>
              <p className="text-2xl font-bold text-primary">
                {platformStats.avgResolutionTime || 0} days
              </p>
            </div>

            <div className="p-4 bg-accent/5 rounded-lg border border-accent/10">
              <div className="flex items-center gap-3 mb-2">
                <FaShieldAlt className="w-5 h-5 text-accent" />
                <span className="text-sm font-medium text-gray-700">
                  System Status
                </span>
              </div>
              <p className="text-lg font-semibold text-accent">
                {(platformStats.resolutionRate || 0) > 70
                  ? "Excellent"
                  : (platformStats.resolutionRate || 0) > 50
                  ? "Good"
                  : "Needs Attention"}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminProfileStats;
