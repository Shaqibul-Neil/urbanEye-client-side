import { useRef, useState } from "react";
import { Link } from "react-router";
import { Edit, Eye, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import EditIssueModal from "../../modals/EditIssueModal";
import useDeleteIssue from "../../../hooks/citizen related/useDeleteIssue";
import useMyInfo from "../../../hooks/citizen related/useMyInfo";
import { getBorder, getStatusBadge } from "../../../utilities/getStatusBadge";

const ReusableIssuesTable = ({
  title,
  data = [],
  loading = false,
  viewAllLink,
  className = "",
  showActions = true,
  limit = null, // if limit is provided, only show that many items
}) => {
  const [currentIssue, setCurrentIssue] = useState({});
  const editIssueRef = useRef();

  // Delete mutation
  const { mutateAsync: deleteIssue } = useDeleteIssue();
  const { myInfo } = useMyInfo();

  // Limit data if specified
  const displayData = limit ? data.slice(0, limit) : data;

  // Event handlers
  const handleEditIssues = (issue) => {
    // Account blocked check
    if (myInfo?.isBlocked) {
      Swal.fire({
        icon: "error",
        title: "Account Blocked",
        text: "Your account is blocked. You cannot edit issues.",
      });
      return;
    }
    // Only pending issues allowed
    if (issue?.status !== "pending") {
      Swal.fire({
        icon: "info",
        title: "Cannot Edit",
        text: "Only pending issues can be edited.",
      });
      return;
    }
    // Else open modal
    setCurrentIssue(issue);
    editIssueRef.current.showModal();
  };

  const handleDeleteIssue = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You cant revert this",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#10b981",
        cancelButtonColor: "#ef4444",
        confirmButtonText: "Yes, Delete",
      });
      if (!result.isConfirmed) return;
      const res = await deleteIssue(id);
      if (res?.issue?.deletedCount) {
        // Success popup
        await Swal.fire({
          title: "Deleted!",
          text: "Your issue has been deleted",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Something went wrong",
        text: error?.response?.data?.message || "Server error!",
        icon: "error",
      });
    }
  };

  if (loading) {
    return (
      <div
        className={`w-full overflow-x-auto bg-white p-4 rounded-3xl ${className}`}
      >
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

  return (
    <div className={`w-full bg-white px-4 pt-2 pb-4 rounded-3xl ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg text-secondary font-bold">{title}</h3>
        {viewAllLink && (
          <Link
            to={viewAllLink}
            className="underline text-primary text-sm hover:text-primary/80"
          >
            View All
          </Link>
        )}
      </div>

      {displayData.length === 0 ? (
        <p className="text-center py-6 text-gray-500">No issues found</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200">
          <table className="table table-zebra w-full min-w-[900px]">
            <thead className="bg-gray-50">
              <tr>
                <th>No</th>
                <th className="w-52">Title & Location</th>
                <th className="text-center">Issue Priority</th>
                <th className="text-center">Issue Tracking Id</th>
                <th className="text-center">Issue Status</th>
                {showActions && <th className="text-center">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {displayData.map((issue, i) => (
                <tr
                  key={issue?._id}
                  className={`transition-all duration-300 hover:scale-[1.01] hover:shadow-md ${
                    i % 2 === 0 ? "bg-gray-100" : "bg-white"
                  }`}
                >
                  <th className={`border-l-4 ${getBorder(issue?.status)}`}>
                    {i + 1}
                  </th>
                  <td>
                    <p>{issue?.title}</p>
                    <p>
                      <span className="font-semibold">Location : </span>
                      {issue?.location}
                    </p>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <p
                      className={`py-1 text-xs badge badge-outline font-bold rounded-full uppercase ${
                        issue?.priority === "high"
                          ? "text-green-700"
                          : issue?.priority === "normal"
                          ? "text-yellow-700"
                          : "text-green-700"
                      }`}
                    >
                      {issue?.priority}
                    </p>
                  </td>
                  <td className="italic text-center">{issue?.trackingId}</td>
                  <td>
                    <p
                      className={`py-1 text-xs font-bold rounded-full uppercase text-center ${getStatusBadge(
                        issue?.status
                      )}`}
                    >
                      {issue?.status}
                    </p>
                  </td>
                  {showActions && (
                    <td className="py-3 px-4 flex gap-3 justify-center items-center">
                      {/* Edit Button */}
                      <button
                        className="w-8 h-8 bg-blue-100 rounded-full flex justify-center items-center cursor-pointer"
                        onClick={() => handleEditIssues(issue)}
                      >
                        <Edit
                          strokeWidth={2.5}
                          className="w-4 h-4 text-primary"
                        />
                      </button>

                      {/* Details Button */}
                      <Link
                        className="w-8 h-8 bg-amber-100 rounded-full flex justify-center items-center cursor-pointer"
                        to={`/issue/${issue?._id}`}
                      >
                        <Eye
                          strokeWidth={2.5}
                          className="w-4 h-4 text-amber-800"
                        />
                      </Link>

                      {/* Delete Button */}
                      <button
                        className="w-8 h-8 bg-red-100 rounded-full flex justify-center items-center cursor-pointer"
                        onClick={() => handleDeleteIssue(issue._id)}
                      >
                        <Trash2
                          strokeWidth={2.5}
                          className="w-4 h-4 text-red-600"
                        />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit issue Modal */}
      {showActions && (
        <EditIssueModal
          editIssueRef={editIssueRef}
          currentIssue={currentIssue}
        />
      )}
    </div>
  );
};

export default ReusableIssuesTable;
