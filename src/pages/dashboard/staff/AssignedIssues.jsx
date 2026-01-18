import { useEffect, useState } from "react";
import { Search, ChevronDown, X } from "lucide-react";
import Heading from "../../../components/common/heading/Heading";
import SubHeading from "../../../components/common/heading/SubHeading";
import useStaffAssignIssue from "../../../hooks/staff related/useStaffAssignIssue";
import ChangeStatusModal from "../../../components/modals/ChangeStatusModal";
import { useRef } from "react";
import { RefreshCw } from "lucide-react";
import {
  getBg,
  getBorder,
  getStatusBadge,
} from "../../../utilities/getStatusBadge";
import Loading from "../../../components/loading/Loading";
import ErrorComponent from "../../../components/error/error page/ErrorComponent";
import { motion } from "framer-motion";
import { useLocation } from "react-router";

const AssignedIssues = () => {
  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(searchText);
  const [currentPage, setCurrentPage] = useState(0);
  const [sortBy, setSortBy] = useState("date-desc");
  const [filters, setFilters] = useState({ status: "" });
  const [selectedIssue, setSelectedIssue] = useState({});
  const location = useLocation();
  const limit = 5;

  const statusModalRef = useRef();

  //wait 0.5s after user stopped typing and then send the signal to backend to fetch
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchText);
      setCurrentPage(0); // Reset to first page on search
    }, 500);
    return () => clearTimeout(handler);
  }, [searchText]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(0);
  }, [filters, sortBy]);

  const {
    assignedIssues,
    pagination,
    issuesLoading,
    issuesError,
    refetchAssignIssues,
  } = useStaffAssignIssue(debouncedSearch, currentPage, limit, filters, sortBy);

  //status modal open
  const handleChangeStatus = (issue) => {
    setSelectedIssue(issue);
    statusModalRef.current.showModal();
  };

  const modalObj = {
    selectedIssue: selectedIssue,
    statusModalRef: statusModalRef,
    refetchAssignIssues: refetchAssignIssues,
  };

  // Handle sort change
  const handleSortChange = (sort) => {
    setSortBy(sort);
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

  if (issuesLoading) return <Loading />;
  if (issuesError) return <ErrorComponent />;

  return (
    <div className="lg:px-5 px-3 py-6 bg-white mx-5 rounded-3xl">
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="flex items-center gap-4 mb-12"
        >
          <div className="w-1 h-8 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          {/* Title */}
          <div className="space-y-2">
            <Heading
              className={"text-3xl lg:text-4xl  pb-1"}
              label={"Assigned Issues"}
            />
            <SubHeading
              label={
                "View and manage all issues assigned to you. Boosted issues are prioritized automatically to ensure faster resolution."
              }
            />
          </div>
        </motion.div>

        {/* Search and Filter Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:px-5 mb-4">
          {/* Search Bar - 2 Grids */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="lg:col-span-2"
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
              className="w-full py-3 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none appearance-none cursor-pointer"
              value={filters.status}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, status: e.target.value }))
              }
            >
              <option value={""}>Status: All</option>
              <option value={"pending"}>Pending</option>
              <option value={"in-progress"}>In Progress</option>
              <option value={"working"}>Working</option>
              <option value={"resolved"}>Resolved</option>
              <option value={"closed"}>Closed</option>
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
            </select>
            <ChevronDown
              size={20}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
          </motion.div>
        </div>

        {/* Results Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="flex justify-between items-center text-sm text-gray-600 lg:px-5"
        >
          <span>
            Showing {assignedIssues.length} of {pagination.totalIssues} issues
          </span>
          <span>
            Page {currentPage + 1} of {pagination.totalPages}
          </span>
        </motion.div>

        {/* Table */}
        <div
          className={`overflow-x-auto rounded-lg shadow-lg border border-gray-200 mx-5 mt-4`}
        >
          <table className="table table-zebra w-full min-w-[900px]">
            {/* Head */}
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 border-b-2 border-blue-600/20">#</th>

                <th className="py-3 px-4 border-b-2 border-blue-600/20 sticky left-0 z-10 bg-gray-50">
                  Issue Title
                </th>

                <th className="py-3 px-4 border-b-2 border-blue-600/20">
                  Category
                </th>

                <th className="py-3 px-4 border-b-2 border-blue-600/20">
                  Priority
                </th>

                <th className="py-3 px-4 border-b-2 border-blue-600/20">
                  Current Status
                </th>

                <th className="py-3 px-4 border-b-2 border-blue-600/20 text-center">
                  Action
                </th>
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {assignedIssues.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-gray-500">
                    No assigned issues found
                  </td>
                </tr>
              ) : (
                assignedIssues.map((issue, i) => (
                  <tr
                    className={`transition-all duration-300 hover:scale-[1.01] hover:shadow-md ${getBg(
                      issue?.status
                    )}`}
                    key={issue?._id}
                  >
                    <th
                      className={`py-3 px-4 border-l-4 ${getBorder(
                        issue?.status
                      )}`}
                    >
                      {currentPage * limit + i + 1}
                    </th>

                    {/* Sticky Issue Title */}
                    <td className="py-3 px-4 sticky left-0 z-10">
                      <div className="space-y-1">
                        <div className="font-extrabold text-gray-800">
                          {issue?.title}
                        </div>
                        <div className="text-xs text-gray-500">
                          Reported:{" "}
                          {new Date(issue?.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4 font-medium text-gray-700">
                      {issue?.category}
                    </td>

                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 text-xs font-bold rounded-full uppercase ${
                          issue?.priority === "high"
                            ? "text-green-700"
                            : "text-yellow-700"
                        }`}
                      >
                        {issue?.priority}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 text-xs font-bold rounded-full uppercase ${getStatusBadge(
                          issue?.status
                        )}`}
                      >
                        {issue?.status}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <div className="w-8 mx-auto">
                        <button
                          className="w-8 h-8 bg-blue-100 rounded-full flex justify-center items-center cursor-pointer hover:scale-105 transition-transform duration-200"
                          onClick={() => handleChangeStatus(issue)}
                          data-tooltip-id="global-tooltip"
                          data-tooltip-content="Change Status"
                        >
                          <RefreshCw
                            size={16}
                            strokeWidth={2.5}
                            className="w-4 h-4 text-blue-800"
                          />{" "}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

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

        {/* Modal */}
        <ChangeStatusModal modalObj={modalObj} />
      </div>
    </div>
  );
};

export default AssignedIssues;
