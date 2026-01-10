import { useRef, useState } from "react";
import { Search, UserPlus, XCircle } from "lucide-react";
import AssignStaffModal from "../../modals/AssignStaffModal";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/auth & role/useAxiosSecure";
import { getStatusBadge } from "../../../utilities/getStatusBadge";
import useIssueReject from "../../../hooks/admin related/useIssueReject";
import Swal from "sweetalert2";
import ErrorComponent from "../../error/error page/ErrorComponent";

const AdminIssuesTable = ({
  title,
  data = [],
  loading = false,
  showSearch = false,
  showActions = true,
  limit = null,
  searchText = "",
  onSearchChange = () => {},
  className = "",
}) => {
  const [assignedStaffIssue, setAssignedStaffIssue] = useState();
  const [selectedStaff, setSelectedStaff] = useState({});
  const assignModalRef = useRef();
  const axiosSecure = useAxiosSecure();

  // Limit data if specified
  const displayData = limit ? data.slice(0, limit) : data;

  // Get staff data for assignment
  const {
    data: staffs = [],
    isLoading: staffLoading,
    isError: staffError,
    refetch: staffRefetch,
  } = useQuery({
    queryKey: ["all-staffs", "available"],
    enabled: showActions, // Only fetch when actions are enabled
    queryFn: async () => {
      const { data } = await axiosSecure.get("/staff");
      return data.staff;
    },
  });

  // Assign staff modal
  const handleAssignStaffModal = (issue) => {
    setAssignedStaffIssue(issue);
    assignModalRef.current.showModal();
  };

  // Reject mutation
  const { mutateAsync: issueReject } = useIssueReject();

  // Issue reject
  const handleReject = async (issue) => {
    try {
      const issueInfo = { issueId: issue._id, status: "rejected" };
      const result = await Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#10b981",
        cancelButtonColor: "#ef4444",
        confirmButtonText: "Yes",
      });
      if (!result.isConfirmed) return;
      const res = await issueReject(issueInfo);
      if (res?.issue?.modifiedCount) {
        await Swal.fire({
          title: "Rejected",
          text: `${issue?.title} has been rejected`,
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Failed to update status",
        text:
          error?.response?.data?.message ||
          "Something went wrong. Please try again.",
        showConfirmButton: true,
      });
    }
  };

  if (loading || staffLoading) {
    return (
      <div className={`w-full bg-white p-4 rounded-3xl ${className}`}>
        <h3 className="text-lg text-secondary font-bold mb-4">{title}</h3>
        <div className="animate-pulse space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-4 p-2">
              <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (staffError) return <ErrorComponent />;
  return (
    <div className={`w-full bg-white p-4 rounded-3xl ${className}`}>
      {title && (
        <h3 className="text-lg text-secondary font-bold mb-4">{title}</h3>
      )}

      {/* Search Section */}
      {showSearch && (
        <div className="flex md:justify-end justify-center mb-4">
          <div className="relative w-full max-w-xs">
            <input
              type="search"
              value={searchText}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search..."
              className="w-full py-2 pl-10 pr-3 bg-gray-100 border border-primary rounded-xl focus:ring-secondary focus:border-secondary focus:outline-none focus:ring-1"
            />
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-primary"
            />
          </div>
        </div>
      )}

      {displayData.length === 0 ? (
        <p className="text-center py-6 text-gray-500">No issues found</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200">
          <table className="table table-zebra w-full min-w-[900px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 border-b-2 border-gray-200 w-10">#</th>
                <th className="py-3 px-4 border-b-2 border-gray-200 w-40">
                  Issue Details & Location
                </th>
                <th className="py-3 px-4 border-b-2 border-gray-200 w-40">
                  Category
                </th>
                <th className="py-3 px-4 border-b-2 border-gray-200 w-36">
                  Priority
                </th>
                <th className="py-3 px-4 border-b-2 border-gray-200 w-36">
                  Status
                </th>
                <th className="py-3 px-4 border-b-2 border-gray-200 w-40">
                  Staff Assigned
                </th>
                {showActions && (
                  <th className="py-3 px-4 border-b-2 border-gray-200 w-36 text-center">
                    Actions
                  </th>
                )}
              </tr>
            </thead>

            <tbody>
              {displayData.map((issue, i) => (
                <tr
                  key={issue._id}
                  className={`transition-all duration-300 hover:shadow-md ${
                    i % 2 === 0 ? "bg-gray-100" : "bg-white"
                  }`}
                >
                  <th
                    className={`py-3 px-4 border-l-4  ${
                      issue?.isAssignedStaff
                        ? "border-l-[#6EE7B7]"
                        : "border-l-yellow-400"
                    }`}
                  >
                    {i + 1}
                  </th>
                  <td className="py-3 px-4">
                    <p className="font-semibold text-gray-800">
                      {issue?.title}
                    </p>
                    <p className="text-gray-600 text-sm">
                      <span className="font-semibold">By : </span>
                      {issue?.userEmail}
                    </p>
                    <p className="text-gray-600 text-sm">{issue?.location}</p>
                  </td>
                  <td className="py-3 px-4 font-medium text-gray-700 text-sm">
                    <span> {issue?.category}</span>
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
                  <td className="py-3 px-4 font-medium text-gray-700">
                    {issue?.isAssignedStaff ? (
                      <>
                        <p className="font-bold text-base">
                          {issue?.assignedStaff?.staffName}
                        </p>
                        <p className="text-xs">
                          {issue?.assignedStaff?.staffEmail || ""}
                        </p>
                        <p className="text-xs">
                          {issue?.assignedStaff?.staffPhone || ""}
                        </p>
                      </>
                    ) : (
                      "No"
                    )}
                  </td>
                  {showActions && (
                    <td className="py-3 px-4">
                      <div className="flex gap-3 justify-center items-center">
                        {issue?.status === "pending" &&
                        !issue?.isAssignedStaff ? (
                          <>
                            <button
                              className="w-8 h-8 bg-blue-100 rounded-full flex justify-center items-center cursor-pointer hover:scale-105 transition-transform duration-200"
                              onClick={() => handleAssignStaffModal(issue)}
                              data-tip="Assign Staff"
                            >
                              <UserPlus
                                size={16}
                                strokeWidth={2.5}
                                className="w-4 h-4 text-primary"
                              />{" "}
                            </button>

                            <button
                              className="w-8 h-8 bg-red-100 rounded-full flex justify-center items-center cursor-pointer hover:scale-105 transition-transform duration-200"
                              onClick={() => handleReject(issue)}
                              tool-tip="Reject Issue"
                            >
                              <XCircle
                                size={16}
                                strokeWidth={2.5}
                                className="w-4 h-4 text-error"
                              />{" "}
                            </button>
                          </>
                        ) : issue.status === "rejected" ? (
                          <span className="px-3 py-1 text-sm font-bold rounded-full bg-red-100 text-red-700 italic">
                            Rejected
                          </span>
                        ) : (
                          <span className="px-3 py-1 text-sm font-bold rounded-full bg-green-100 text-green-700 italic">
                            Assigned
                          </span>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Section */}
      {showActions && (
        <AssignStaffModal
          assignModalRef={assignModalRef}
          assignedStaffIssue={assignedStaffIssue}
          staffs={staffs}
          staffRefetch={staffRefetch}
          selectedStaff={selectedStaff}
          setSelectedStaff={setSelectedStaff}
        />
      )}
    </div>
  );
};

export default AdminIssuesTable;
