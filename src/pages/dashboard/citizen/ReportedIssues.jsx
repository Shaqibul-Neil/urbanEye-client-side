import { useRef, useState } from "react";
import Heading from "../../../components/common/heading/Heading";
import SubHeading from "../../../components/common/heading/SubHeading";
import useGetIssues from "../../../hooks/citizen related/useGetIssues";
import EditIssueModal from "../../../components/modals/EditIssueModal";
import useDeleteIssue from "../../../hooks/citizen related/useDeleteIssue";
import Swal from "sweetalert2";
import useMyInfo from "../../../hooks/citizen related/useMyInfo";
import {
  getBg,
  getBorder,
  getStatusBadge,
} from "../../../utilities/getStatusBadge";

const ReportedIssues = () => {
  //dependencies
  const { issues, isLoading, isError } = useGetIssues();
  const [currentIssue, setCurrentIssue] = useState({});
  const editIssueRef = useRef();
  //delete mutation
  const { mutateAsync: deleteIssue } = useDeleteIssue();
  const { myInfo } = useMyInfo();

  //event handlers
  const handleEditIssues = (issue) => {
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
      console.log(res);
      if (res?.issue?.deletedCount) {
        //success popup
        await Swal.fire({
          title: "Deleted!",
          text: "Your issue has been deleted",
          icon: "success",
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
  return (
    <div className="px-5">
      <div className="space-y-12">
        {/* Title Section */}
        <div className="space-y-2">
          <Heading label={"My Reported Issues"} />
          <SubHeading
            label={
              "Track the status of all the issues you have reported and see updates in real-time."
            }
          />
        </div>
        {/* Table Section */}
        <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200">
          <table className="table table-zebra w-full min-w-[900px]">
            {/* head */}
            <thead className="bg-gray-50">
              <tr>
                <th>No</th>
                <th>Title & Location</th>
                <th>Issue Priority</th>
                <th>Issue Tracking Id</th>
                <th>Issue Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {issues.map((issue, i) => (
                <tr
                  key={issue?._id}
                  className={`transition-all duration-300 hover:scale-[1.01] hover:shadow-md ${getBg(
                    issue?.status
                  )}`}
                >
                  <th
                    className={`py-3 px-4 border-l-4  ${getBorder(
                      issue?.status
                    )}`}
                  >
                    {i + 1}
                  </th>
                  <td className="py-3 px-4">
                    <p>{issue?.title}</p>
                    <p>
                      <span className="font-semibold">Location : </span>
                      {issue?.location}
                    </p>
                  </td>
                  <td className="py-3 px-4">
                    <p
                      className={`py-1 text-xs font-bold rounded-full uppercase ${
                        issue?.priority === "high"
                          ? "animate-pulse text-green-700"
                          : "text-yellow-700"
                      }`}
                    >
                      {issue?.priority}
                    </p>
                  </td>
                  <td>{issue?.trackingId}</td>
                  <td className="py-3 px-4">
                    <p
                      className={`py-1 text-xs font-bold rounded-full uppercase text-center ${getStatusBadge(
                        issue?.status
                      )}`}
                    >
                      {issue?.status}
                    </p>
                  </td>
                  <td className="space-x-1 flex py-3 px-4">
                    {/* Edit Button */}
                    <span
                      className="tooltip-wrapper"
                      title={
                        myInfo?.isBlocked
                          ? "Your account is blocked. You cannot edit issues."
                          : issue?.status !== "pending"
                          ? "Only pending issues can be edited."
                          : ""
                      }
                    >
                      <button
                        className={`btn btn-sm ${
                          issue?.status !== "pending" || myInfo?.isBlocked
                            ? "bg-gray-400 cursor-not-allowed opacity-70"
                            : "btn-accent text-black"
                        }`}
                        disabled={
                          issue?.status !== "pending" || myInfo?.isBlocked
                        }
                        onClick={() => handleEditIssues(issue)}
                      >
                        Edit
                      </button>
                    </span>
                    {/* Details Button */}
                    <button className="btn btn-warning btn-sm text-black">
                      Details
                    </button>
                    {/* Delete Button */}
                    <button
                      className="btn btn-error btn-sm text-black"
                      onClick={() => handleDeleteIssue(issue._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/*Edit issue Modal */}
        <EditIssueModal
          editIssueRef={editIssueRef}
          currentIssue={currentIssue}
        />
      </div>
    </div>
  );
};

export default ReportedIssues;
