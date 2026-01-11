import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useAxios from "../../hooks/auth & role/useAxios";
import {
  Search,
  ChevronDown,
  ArrowUpDown,
  AlertTriangle,
  Clock,
  CheckCircle2,
  TrendingUp,
  Lightbulb,
  Users,
  Target,
  MessageSquare,
  SearchX,
  ListChecks,
  Loader,
  Lock,
} from "lucide-react";
import { LuNewspaper } from "react-icons/lu";
import Loading from "../../components/loading/Loading";
import SubHeading from "../../components/common/heading/SubHeading";
import IssueCard from "../../components/common/card/issue card/IssueCard";
import ErrorComponent from "../../components/error/error page/ErrorComponent";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const sidebarVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.2 } },
};

const AllIssues = () => {
  const axiosInstance = useAxios();
  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(searchText);
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // For pagination
  const [totalIssue, setTotalIssue] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  // For filter
  const [filters, setFilters] = useState({
    status: [],
    priority: [],
  });

  // New state for status filter dropdown
  const [selectedStatus, setSelectedStatus] = useState("all");

  // New state for sorting
  const [sortBy, setSortBy] = useState("date-desc");

  const limit = 9;

  //wait .5s after user stopped typing and then send the signal to backend to fetch
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchText);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchText]);

  //all issues data fetch
  useEffect(() => {
    const issuesData = async () => {
      try {
        setLoading(true);
        const statusQuery = filters.status.length
          ? filters.status.join(",")
          : "";

        const priorityQuery = filters.priority.length
          ? filters.priority.join(",")
          : "";

        const { data } = await axiosInstance.get(
          `/issues/public/all-issues?searchText=${debouncedSearch}&limit=${limit}&skip=${
            currentPage * limit
          }&status=${statusQuery}&priority=${priorityQuery}`
        );
        setIssues(data?.issue);
        setTotalIssue(data?.total);
        const page = Math.ceil(data?.total / limit);
        setTotalPage(page);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    issuesData();
  }, [axiosInstance, debouncedSearch, currentPage, filters]);

  //reset current page value if search value changes
  useEffect(() => {
    setCurrentPage(0);
  }, [debouncedSearch]);
  // Handle status filter change
  const handleStatusFilterChange = (status) => {
    setSelectedStatus(status);
    if (status === "all") {
      setFilters((prev) => ({ ...prev, status: [] }));
    } else {
      setFilters((prev) => ({ ...prev, status: [status] }));
    }
  };

  // Process and sort issues
  const processedIssues = useMemo(() => {
    let sortedIssues = [...issues];

    // Apply sorting
    sortedIssues.sort((a, b) => {
      switch (sortBy) {
        case "date-asc":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "date-desc":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "priority-high": {
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return (
            (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0)
          );
        }
        case "priority-low": {
          const priorityOrderLow = { high: 3, medium: 2, low: 1 };
          return (
            (priorityOrderLow[a.priority] || 0) -
            (priorityOrderLow[b.priority] || 0)
          );
        }
        case "upvotes-desc":
          return (b.totalUpvoteCount || 0) - (a.totalUpvoteCount || 0);
        case "upvotes-asc":
          return (a.totalUpvoteCount || 0) - (b.totalUpvoteCount || 0);
        case "title-asc":
          return (a.title || "").localeCompare(b.title || "");
        case "title-desc":
          return (b.title || "").localeCompare(a.title || "");
        default:
          return 0;
      }
    });

    return sortedIssues;
  }, [issues, sortBy]);

  // Calculate quick stats
  const quickStats = useMemo(() => {
    const total = totalIssue;
    const pending = issues.filter((issue) => issue.status === "pending").length;
    const inProgress = issues.filter(
      (issue) => issue.status === "in-progress"
    ).length;
    const working = issues.filter((issue) => issue.status === "working").length;
    const resolved = issues.filter(
      (issue) => issue.status === "resolved"
    ).length;
    const rejected = issues.filter(
      (issue) => issue.status === "rejected"
    ).length;
    const closed = issues.filter((issue) => issue.status === "closed").length;

    // Calculate resolution rate (resolved + closed as completed)
    const completed = resolved + closed;

    return {
      total,
      pending,
      inProgress,
      working,
      resolved,
      rejected,
      closed,
      completed,
      resolutionRate: total > 0 ? ((completed / total) * 100).toFixed(1) : 0,
    };
  }, [issues, totalIssue]);
  // Upvote UI update handler
  const handleUpdateUI = (id) => {
    setIssues((prevIssues) => {
      return prevIssues.map((issue) => {
        if (issue._id !== id) {
          return issue;
        }
        const newIssue = {
          ...issue,
          totalUpvoteCount: (issue.totalUpvoteCount || 0) + 1,
        };
        return newIssue;
      });
    });
  };

  if (loading) return <Loading />;
  if (error) return <ErrorComponent />;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 min-h-screen">
      {/* Page Header */}
      <div className="relative mb-8">
        <div className="absolute -left-6 -top-6 h-24 w-24 opacity-20 hidden sm:block">
          <svg viewBox="0 0 100 100" className="h-full w-full">
            {Array.from({ length: 100 }).map((_, i) => (
              <circle
                key={i}
                cx={(i % 10) * 10}
                cy={Math.floor(i / 10) * 10}
                r="1.5"
                fill="#6b7280"
              />
            ))}
          </svg>
        </div>
        <p className="section-title">
          <LuNewspaper />
          Issues Dashboard
        </p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#1E2631] mt-2">
          Explore Public <span className="text-primary">Issues</span>
        </h2>
        <SubHeading
          label="Browse through the latest issues reported by the community. Upvote the ones you care about, check priorities, and stay informed about your area."
          className="mt-4 max-w-3xl"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Column: Issues */}
        <div className="lg:col-span-3">
          {/* Search and Filters Row */}
          <div className="flex flex-col gap-4 mb-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by issue name or location..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
              />
              {searchText && (
                <button
                  onClick={() => setSearchText("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Filters and Sort Row */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <h3 className="text-2xl font-semibold text-gray-800">
                All Issues
                {totalIssue > 0 && (
                  <span className="text-lg text-gray-500 ml-2">
                    ({totalIssue})
                  </span>
                )}
              </h3>

              <div className="flex flex-col sm:flex-row gap-3">
                {/* Status Filter Dropdown */}
                <div className="relative">
                  <select
                    value={selectedStatus}
                    onChange={(e) => handleStatusFilterChange(e.target.value)}
                    className="appearance-none w-full sm:w-48 border border-gray-300 rounded-lg px-4 py-2.5 bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition pr-10"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="working">Working</option>
                    <option value="resolved">Resolved</option>
                    <option value="rejected">Rejected</option>
                    <option value="closed">Closed</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </div>
                </div>

                {/* Sort Dropdown */}
                <div className="relative">
                  <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none w-full sm:w-60 border border-gray-300 rounded-lg pl-10 pr-10 py-2.5 bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
                  >
                    <option value="date-desc">Date (Newest First)</option>
                    <option value="date-asc">Date (Oldest First)</option>
                    <option value="priority-high">
                      Priority (High to Low)
                    </option>
                    <option value="priority-low">Priority (Low to High)</option>
                    <option value="upvotes-desc">Upvotes (High to Low)</option>
                    <option value="upvotes-asc">Upvotes (Low to High)</option>
                    <option value="title-asc">Title (A-Z)</option>
                    <option value="title-desc">Title (Z-A)</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Issues Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${debouncedSearch}-${selectedStatus}-${sortBy}-${currentPage}`}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {processedIssues.length > 0 ? (
                processedIssues.map((issue, index) => (
                  <motion.div
                    key={issue._id}
                    variants={cardVariants}
                    layout
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      delay: index * 0.1,
                    }}
                  >
                    <IssueCard issue={issue} onUpvoteSuccess={handleUpdateUI} />
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="md:col-span-2 lg:col-span-3 text-center text-gray-500 py-20 flex flex-col items-center"
                >
                  <SearchX className="w-12 h-12 text-gray-400 mb-4" />
                  <h3 className="text-xl font-semibold">No Issues Found</h3>
                  <p>
                    {searchText
                      ? `No issues match your search "${searchText}"`
                      : "No issues were found with the current filters."}
                  </p>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Pagination */}
          <div className="flex justify-center gap-2 mt-10">
            {currentPage > 0 && (
              <button
                className="btn btn-primary btn-outline rounded-xl"
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Prev
              </button>
            )}
            {[...Array(totalPage).keys()].map((_, i) => (
              <button
                onClick={() => setCurrentPage(i)}
                className={`btn btn-primary rounded-xl ${
                  i === currentPage ? "" : "btn-outline"
                }`}
                key={i}
              >
                {i + 1}
              </button>
            ))}
            {currentPage < totalPage - 1 && (
              <button
                className="btn btn-primary btn-outline rounded-xl"
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Quick Stats & Tips */}
        <motion.div
          variants={sidebarVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-1 space-y-6"
        >
          {/* Quick Stats */}
          <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary/10 rounded-full">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                Quick Stats
              </h3>
            </div>

            <div className="space-y-4">
              {/* Total Issues */}
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <ListChecks size={16} className="text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    Total Issues
                  </span>
                </div>
                <span className="text-xl font-bold text-blue-600">
                  {quickStats.total}
                </span>
              </div>

              {/* Pending Issues */}
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                    <AlertTriangle size={16} className="text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    Pending
                  </span>
                </div>
                <span className="text-xl font-bold text-yellow-600">
                  {quickStats.pending}
                </span>
              </div>

              {/* In Progress */}
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <Loader size={16} className="text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    In Progress
                  </span>
                </div>
                <span className="text-xl font-bold text-blue-600">
                  {quickStats.inProgress}
                </span>
              </div>

              {/* Working */}
              <div className="flex items-center justify-between p-3 bg-cyan-50 rounded-lg border border-cyan-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center">
                    <Target size={16} className="text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    Working
                  </span>
                </div>
                <span className="text-xl font-bold text-cyan-600">
                  {quickStats.working}
                </span>
              </div>

              {/* Resolved Issues */}
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                    <CheckCircle2 size={16} className="text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    Resolved
                  </span>
                </div>
                <span className="text-xl font-bold text-green-600">
                  {quickStats.resolved}
                </span>
              </div>

              {/* Closed Issues */}
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-500 rounded-lg flex items-center justify-center">
                    <Lock size={16} className="text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    Closed
                  </span>
                </div>
                <span className="text-xl font-bold text-gray-600">
                  {quickStats.closed}
                </span>
              </div>

              {/* Rejected Issues */}
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                    <SearchX size={16} className="text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    Rejected
                  </span>
                </div>
                <span className="text-xl font-bold text-red-600">
                  {quickStats.rejected}
                </span>
              </div>

              {/* Completion Rate */}
              <div className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/20">
                <div className="text-center">
                  <div className="text-2xl font-black text-primary mb-1">
                    {quickStats.resolutionRate}%
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    Completion Rate
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    ({quickStats.completed} completed out of {quickStats.total})
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Tips */}
          <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-yellow-100 rounded-full">
                <Lightbulb className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                Quick Tips
              </h3>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <div className="flex items-start gap-3">
                  <Target className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm mb-1">
                      Report Effectively
                    </h4>
                    <p className="text-xs text-gray-600">
                      Include clear photos, exact location, and detailed
                      description for faster resolution.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                <div className="flex items-start gap-3">
                  <MessageSquare className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm mb-1">
                      Engage with Community
                    </h4>
                    <p className="text-xs text-gray-600">
                      Upvote issues that affect you to help prioritize community
                      concerns.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm mb-1">
                      Track Progress
                    </h4>
                    <p className="text-xs text-gray-600">
                      Monitor issue status updates and resolution timelines in
                      your dashboard.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm mb-1">
                      Community Guidelines
                    </h4>
                    <p className="text-xs text-gray-600">
                      Be respectful, provide accurate information, and avoid
                      duplicate reports.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AllIssues;
