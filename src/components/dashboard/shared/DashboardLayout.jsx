import { FaChartBar, FaCheckCircle, FaClock, FaTimes } from "react-icons/fa";
import MetricCard from "./MetricCard";
import StatusPieChart from "./StatusPieChart";
import ResolutionRateChart from "./ResolutionRateChart";
import TopUpvotedChart from "./TopUpvotedChart";
import DataTable from "./DataTable";
import IssuesTable from "./IssuesTable";
import PaymentAreaChart from "./PaymentAreaChart";

const DashboardLayout = ({
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
  latestPayments = [],
  
  // Loading states
  loading = false,
  
  // Role-specific config
  role = "citizen", // admin, citizen, staff
  
  // Links
  paymentHistoryLink = "/dashboard/payments-history"
}) => {
  
  // Calculate metrics
  const pendingIssues = statusStats?.find(s => s._id === "pending")?.count || 0;
  const rejectedIssues = statusStats?.find(s => s._id === "rejected")?.count || 0;
  
  // Filter status stats for pie chart (exclude resolved for separate display)
  const pieChartData = statusStats?.filter(s => s._id !== "resolved") || [];

  if (loading) {
    return (
      <div className="px-5">
        <div className="animate-pulse space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
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
      {/* Section 1: Issue Metrics (4 Cards + 2 Charts) */}
      <div className="bg-white p-6 rounded-3xl">
        <h2 className="text-lg text-secondary font-bold mb-4">
          Issue Metrics
          <span className="font-normal text-base ml-2">
            Total Submitted Issues: {totalIssues}
          </span>
        </h2>
        
        <div className="flex gap-6">
          {/* Left: 4 Cards in 2x2 Grid */}
          <div className="grid grid-cols-2 gap-4 flex-1">
            {/* Total Issues */}
            <MetricCard
              title="Total Issues"
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
          
          {/* Right: 2 Charts in Flex Column */}
          <div className="flex flex-col gap-4 w-80">
            {/* Status Distribution Pie Chart */}
            <StatusPieChart 
              data={pieChartData}
              title="Status Distribution"
            />
            
            {/* Resolution Rate Chart */}
            <ResolutionRateChart
              totalIssues={totalIssues}
              resolvedIssues={resolvedIssues}
            />
          </div>
        </div>
      </div>

      {/* Section 2: Payment Analytics + Upvotes */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Payment Chart (3 columns) */}
        <div className="lg:col-span-3">
          {paymentStats && (
            <PaymentAreaChart paymentStats={paymentStats} />
          )}
        </div>
        
        {/* Top Upvoted Issues (1 column) */}
        <div className="lg:col-span-1">
          {role !== "staff" && (
            <TopUpvotedChart 
              data={topUpvotedIssues}
              title="Top Upvoted Issues"
            />
          )}
          {role === "staff" && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-full flex items-center justify-center">
              <p className="text-gray-500 text-center">
                Upvote analytics<br />coming soon for staff
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Section 3: Data Tables (Role-based) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Latest Issues */}
        <IssuesTable
          title="Latest Posted Issues"
          data={latestIssues}
          loading={loading}
          className="xl:col-span-2"
        />
        
        {/* Latest Users (Admin only) */}
        {role === "admin" && (
          <DataTable
            title="Latest Registered Users"
            data={latestUsers}
            type="users"
            loading={loading}
          />
        )}
        
        {/* Latest Payments */}
        <DataTable
          title="Latest Payments"
          data={latestPayments}
          type="payments"
          loading={loading}
          viewAllLink={paymentHistoryLink}
          className={role === "admin" ? "" : "xl:col-span-2"}
        />
      </div>
    </div>
  );
};

export default DashboardLayout;