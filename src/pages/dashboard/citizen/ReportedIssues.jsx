import { useRef, useState } from "react";
import Heading from "../../../components/common/heading/Heading";
import SubHeading from "../../../components/common/heading/SubHeading";
import useGetIssues from "../../../hooks/citizen related/useGetIssues";
import EditIssueModal from "../../../components/modals/EditIssueModal";
import useDeleteIssue from "../../../hooks/citizen related/useDeleteIssue";
import Swal from "sweetalert2";

const ReportedIssues = () => {
  //dependencies
  const { issues, isLoading, isError } = useGetIssues();
  console.log(issues);
  const [currentIssue, setCurrentIssue] = useState({});
  const editIssueRef = useRef();
  //delete mutation
  const { mutateAsync: deleteIssue } = useDeleteIssue();

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
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
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
                <tr key={issue._id}>
                  <th>{i + 1}</th>
                  <td>
                    <p>{issue.title}</p>
                    <p>
                      <span className="font-semibold">Location : </span>
                      {issue.location}
                    </p>
                  </td>
                  <td>
                    <p
                      className={`badge text-secondary uppercase badge-sm font-semibold ${
                        issue.priority === "normal"
                          ? "badge-accent"
                          : "badge-success"
                      }`}
                    >
                      {issue.priority}
                    </p>
                  </td>
                  <td>{issue.trackingId}</td>
                  <td>
                    <p
                      className={`${
                        issue.status === "pending"
                          ? "text-warning"
                          : issue.status === "in-progress"
                          ? "text-primary"
                          : "text-success"
                      } font-semibold uppercase`}
                    >
                      {issue.status}
                    </p>
                  </td>
                  <td className="space-x-1 flex">
                    <button
                      className="btn btn-accent btn-sm text-black"
                      disabled={issue.status !== "pending"}
                      onClick={() => handleEditIssues(issue)}
                    >
                      Edit
                    </button>
                    <button className="btn btn-warning btn-sm text-black">
                      Details
                    </button>
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
