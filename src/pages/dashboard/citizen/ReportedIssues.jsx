import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, ChevronDown, X } from "lucide-react";
import Heading from "../../../components/common/heading/Heading";
import SubHeading from "../../../components/common/heading/SubHeading";
import Loading from "../../../components/loading/Loading";
import useFilteredIssues from "../../../hooks/citizen related/useFilteredIssue";
import ErrorComponent from "../../../components/error/error page/ErrorComponent";
import ReusableIssuesTable from "../../../components/dashboard/shared/ReusableIssuesTable";

const ReportedIssues = () => {
  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(searchText);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [sortBy, setSortBy] = useState("date-desc");
  const limit = 5;

  const [filters, setFilters] = useState({
    status: [],
    priority: [],
  });

  //wait 0.5s after user stopped typing and then send the signal to backend to fetch
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchText);
      setCurrentPage(0); // Reset to first page on search
    }, 500);
    return () => clearTimeout(handler);
  }, [searchText]);

  // Update filters when selectedStatus changes
  const derivedFilters = {
    status: selectedStatus === "all" ? [] : [selectedStatus],
    priority: filters.priority, // maintain priority separately if needed
  };

  // useEffect(() => {
  //   if (selectedStatus === "all") {
  //     setFilters((prev) => ({ ...prev, status: [] }));
  //   } else {
  //     setFilters((prev) => ({ ...prev, status: [selectedStatus] }));
  //   }
  //   setCurrentPage(0);
  // }, [selectedStatus]);

  const { issues, pagination, isLoading, isError, refetch } = useFilteredIssues(
    debouncedSearch,
    currentPage,
    limit,
    derivedFilters,
    sortBy
  );

  // Handle filter changes
  const handleStatusChange = (status) => {
    setSelectedStatus(status);
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
    setCurrentPage(0);
  };

  const clearSearch = () => {
    setSearchText("");
    setDebouncedSearch("");
    setCurrentPage(0);
  };

  // Pagination handlers
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePrevPage = () => {
    if (pagination.hasPrev) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (pagination.hasNext) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (isLoading) return <Loading />;
  if (isError) return <ErrorComponent />;

  return (
    <div className="p-5 bg-white max-w-[95%] mx-auto rounded-3xl">
      <div className="space-y-12">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="flex items-center gap-4"
        >
          <div className="w-1 h-8 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <div className="space-y-2">
            <Heading
              label={"My Reported Issues"}
              className={"md:text-4xl text-3xl lg:text-5xl pb-1"}
            />
            <SubHeading
              label={
                "Track the status of all the issues you have reported and see updates in real-time."
              }
            />
          </div>
        </motion.div>

        {/* Filter Section - Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-6">
          {/* Search Bar - 3 Grids */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="lg:col-span-3 md:col-span-2"
          >
            <div className="relative">
              <input
                type="search"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search by title, location, or category..."
                className="w-full py-3 pl-12 pr-10 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none transition-all"
              />
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              {searchText && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <X size={16} className="text-gray-400" />
                </button>
              )}
            </div>
          </motion.div>

          {/* Status Filter - 1 Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="relative"
          >
            <select
              value={selectedStatus}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="w-full py-3 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none appearance-none cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="working">Working</option>
              <option value="resolved">Resolved</option>
              <option value="rejected">Rejected</option>
              <option value="closed">Closed</option>
            </select>
            <ChevronDown
              size={20}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
          </motion.div>

          {/* Sort Filter - 1 Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="relative"
          >
            <select
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="w-full py-3 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none appearance-none cursor-pointer"
            >
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="priority-high">High Priority First</option>
              <option value="priority-low">Low Priority First</option>
              <option value="title-asc">Title A-Z</option>
              <option value="title-desc">Title Z-A</option>
              <option value="status">By Status</option>
            </select>
            <ChevronDown
              size={20}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
          </motion.div>
        </div>

        {/* Results Summary */}
        <motion.div
          className="flex justify-between items-center text-sm text-gray-600"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <span>
            Showing {issues.length} of {pagination.totalIssues} issues
          </span>
          <span>
            Page {currentPage + 1} of {pagination.totalPages}
          </span>
        </motion.div>

        {/* Table Section */}
        <ReusableIssuesTable
          title=""
          data={issues}
          loading={isLoading}
          showActions={true}
          className="shadow-none p-0"
        />

        {/* Pagination Controls */}
        {pagination.totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-6">
            <button
              onClick={handlePrevPage}
              disabled={!pagination.hasPrev}
              className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              Previous
            </button>

            {/* Page Numbers */}
            <div className="flex gap-1">
              {Array.from({ length: pagination.totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg cursor-pointer ${
                    currentPage === i
                      ? "bg-primary text-white"
                      : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={handleNextPage}
              disabled={!pagination.hasNext}
              className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportedIssues;
