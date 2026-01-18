import { useEffect, useState } from "react";
import {
  AlertTriangle,
  Clock,
  CheckCircle2,
  Activity,
  BarChart3,
  Settings,
} from "lucide-react";
import useAxios from "../../../hooks/auth & role/useAxios";
import PremiumMetricCard from "./PremiumMetricCard";
import PremiumCategoryBar from "./PremiumCategoryBar";
import PremiumResolutionCard from "./PremiumResolutionCard";
import CityPulseResolutionRateChart from "./CityPulseResolutionRateChart";
import InteractiveHeatMap from "./InteractiveHeatMap";
import "./CityPulse.css";
import { easeOut, motion } from "framer-motion";
import toast from "react-hot-toast";

// Main Award-Winning CityPulse Dashboard Component
export default function CityPulseDashboard() {
  const [loading, setLoading] = useState(true);
  const [pulseData, setPulseData] = useState(null);
  const axiosInstance = useAxios();

  useEffect(() => {
    const fetchPulseData = async () => {
      try {
        const response = await axiosInstance.get(
          "/issues/api/analytics/city-pulse"
        );
        setPulseData(response.data);
      } catch (error) {
        toast.error("Failed to fetch pulse data:", error);
        // Fallback to mock data for demonstration
        setPulseData({
          open: 12,
          inProgress: 5,
          working: 8,
          resolved: 20,
          avgResolutionTime: 1.8,
          categories: [
            { name: "Road Damage / Potholes", total: 14 },
            { name: "Garbage Collection", total: 9 },
            { name: "Water Supply Issues", total: 6 },
          ],
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPulseData();
  }, [axiosInstance]);
  //console.log(pulseData);
  if (loading) {
    return (
      <section className="w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 px-5 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-12">
            <div className="h-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded-3xl"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-80 bg-gradient-to-br from-gray-200 to-gray-300 rounded-3xl"
                ></div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-2 h-96 bg-gradient-to-br from-gray-200 to-gray-300 rounded-3xl"></div>
              <div className="h-96 bg-gradient-to-br from-gray-200 to-gray-300 rounded-3xl"></div>
              <div className="h-96 bg-gradient-to-br from-gray-200 to-gray-300 rounded-3xl"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!pulseData) {
    return (
      <section className="w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 px-5 py-16">
        <div className="max-w-7xl mx-auto text-center">
          <div className="bg-red-50/80 backdrop-blur-xl border border-red-200/50 rounded-3xl p-16 shadow-2xl">
            <AlertTriangle size={64} className="text-red-500 mx-auto mb-6" />
            <h3 className="text-2xl font-black text-red-800 mb-4">
              Data Unavailable
            </h3>
            <p className="text-red-600 text-lg">
              Unable to load City Pulse analytics at this time.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const maxCategoryCount = Math.max(
    ...pulseData.categories.map((cat) => cat.total)
  );
  const totalIssues =
    (pulseData.open || 0) +
    (pulseData.inProgress || 0) +
    (pulseData.working || 0) +
    (pulseData.resolved || 0);
  //console.log(pulseData);
  return (
    <section className="w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 px-5 py-16 relative overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-200/30 to-transparent rounded-full blur-3xl -translate-x-64 -translate-y-64 animate-float"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-purple-200/30 to-transparent rounded-full blur-3xl translate-x-48 translate-y-48 animate-float-delayed"></div>
      <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-gradient-to-r from-indigo-200/20 to-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse-slow"></div>

      <div className="max-w-7xl mx-auto relative z-10 container md:pb-8 py-8 lg:px-6 px-1">
        {/* Premium Header Section */}
        <div className="text-center mb-12">
          {/* <div className="inline-flex items-center gap-4 bg-white/80 backdrop-blur-xl px-8 py-4 rounded-2xl shadow-xl border border-white/30 mb-8 transform hover:scale-105 transition-all duration-500">
            <Activity size={24} className="text-blue-600" />
            <span className="text-sm font-bold text-gray-600 uppercase tracking-[0.2em]">
              Live Analytics
            </span>
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          </div> */}

          <motion.h2
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl md:text-5xl font-black text-gray-900 mb-2 leading-none"
          >
            City{" "}
            <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
              Pulse
            </span>
          </motion.h2>
          <motion.p
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="text-gray-600 max-w-5xl mx-auto leading-relaxed font-medium"
          >
            Gain real-time insights into civic engagement, tracking how
            residents interact with local services, report issues, and follow up
            on resolutions across the urban landscape. Monitor patterns,
            identify hotspots, and understand the pulse of the city as it
            evolves, all in a single intuitive dashboard.
          </motion.p>
        </div>

        {/* Section 1: Premium Stats Overview Cards (4 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <PremiumMetricCard
            title="Open Issues"
            count={pulseData.open}
            icon={AlertTriangle}
            gradient="bg-gradient-to-r from-red-400 to-red-500"
            delay={0}
          />
          <PremiumMetricCard
            title="In Progress"
            count={pulseData.inProgress}
            icon={Clock}
            gradient="bg-gradient-to-r from-amber-400 to-orange-400"
            delay={300}
          />
          <PremiumMetricCard
            title="Working"
            count={pulseData.working}
            icon={Settings}
            gradient="bg-gradient-to-r from-blue-400 to-blue-600"
            delay={600}
          />
          <PremiumMetricCard
            title="Resolved"
            count={pulseData.resolved}
            icon={CheckCircle2}
            gradient="bg-gradient-to-r from-green-400 to-emerald-600"
            delay={900}
          />
        </div>
        {/* Section 3: Interactive Heat Map */}
        <InteractiveHeatMap />
        {/* Section 2: Premium Analytics Grid (lg:grid-cols-4) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-6 md:mt-16 mt-12 items-center">
          {/* Premium Top Categories - 2 Grids */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="lg:col-span-2 col-span-1 bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-sm border border-white/30 relative overflow-hidden mt-8 lg:mt-0 md:h-60 order-2"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-pink-50/30 to-indigo-50/50"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <BarChart3 size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-gray-800">
                    Top Categories
                  </h3>
                  <p className="text-xs text-gray-500 font-medium">
                    Most reported civic issues
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                {pulseData.categories.slice(0, 3).map((category, index) => (
                  <PremiumCategoryBar
                    key={category.name}
                    category={category}
                    index={index}
                    maxCount={maxCategoryCount}
                  />
                ))}
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="col-span-2 flex md:flex-row flex-col gap-6 justify-between items-center"
          >
            {/* Premium Resolution Time - 1 Grid */}
            <PremiumResolutionCard avgTime={pulseData.avgResolutionTime} />

            {/* Resolution Rate Chart - 1 Grid */}
            <CityPulseResolutionRateChart
              totalIssues={pulseData.total}
              resolvedIssues={pulseData.resolved}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
