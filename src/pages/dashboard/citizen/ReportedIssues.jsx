import { useRef, useState } from "react";
import Heading from "../../../components/common/heading/Heading";
import SubHeading from "../../../components/common/heading/SubHeading";
import EditIssueModal from "../../../components/modals/EditIssueModal";
import useDeleteIssue from "../../../hooks/citizen related/useDeleteIssue";
import Swal from "sweetalert2";
import useMyInfo from "../../../hooks/citizen related/useMyInfo";
import {
  getBg,
  getBorder,
  getStatusBadge,
} from "../../../utilities/getStatusBadge";
import Loading from "../../../components/loading/Loading";
import ErrorPage from "../../../components/error/error page/ErrorPage";
import { Link } from "react-router";
import {
  PriorityFiltration,
  StatusFiltration,
} from "../../../components/common/sidebarLinks/Filtration";
import useFilteredIssues from "../../../hooks/citizen related/useFilteredIssue";

const ReportedIssues = () => {
  const [filters, setFilters] = useState({
    status: [],
    priority: [],
  });

  const [currentIssue, setCurrentIssue] = useState({});
  //dependencies
  const { issues, isLoading, isError } = useFilteredIssues(filters);
  const editIssueRef = useRef();
  //delete mutation
  const { mutateAsync: deleteIssue } = useDeleteIssue();
  const { myInfo } = useMyInfo();

  //event handlers
  const handleEditIssues = (issue) => {
    // account blocked check
    if (myInfo?.isBlocked) {
      Swal.fire({
        icon: "error",
        title: "Account Blocked",
        text: "Your account is blocked. You cannot edit issues.",
      });
      return;
    }
    // only pending issues allowed
    if (issue?.status !== "pending") {
      Swal.fire({
        icon: "info",
        title: "Cannot Edit",
        text: "Only pending issues can be edited.",
      });
      return;
    }
    // else open modal
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

  //filtration handler
  const handleCheckboxChange = (type, value) => {
    setFilters((prev) => {
      const exists = prev[type].includes(value);

      return {
        ...prev,
        [type]: exists
          ? prev[type].filter((v) => v !== value)
          : [...prev[type], value],
      };
    });
  };
  const filtrationProps = { filters: filters, onChange: handleCheckboxChange };
  if (isLoading) return <Loading />;
  if (isError) return <ErrorPage />;
  return (
    <div className="px-5">
      <div className="space-y-12">
        {/* Title Section */}
        <div className="flex gap-3 justify-between items-center md:flex-row flex-col">
          <div className="space-y-2">
            <Heading
              label={"My Reported Issues"}
              className={"text-4xl md:text-5xl pb-1"}
            />
            <SubHeading
              label={
                "Track the status of all the issues you have reported and see updates in real-time."
              }
            />
          </div>

          {/* Filter Section */}
          <div className="drawer w-32">
            <input id="my-drawer-1" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
              {/* Page content here */}
              <label
                htmlFor="my-drawer-1"
                className="btn drawer-button btn-outline btn-primary"
              >
                Filter By
              </label>
            </div>
            <div className="drawer-side text-xl text-primary text-center font-semibold">
              <label
                htmlFor="my-drawer-1"
                aria-label="close sidebar"
                className="drawer-overlay w-full"
              >
                Filter By
              </label>
              <ul className="menu md:w-lg w-11/12 mx-auto md:p-10 p-6 text-secondary bg-white rounded-3xl my-auto">
                {/* Sidebar content here */}
                {/* By Status */}
                <div className="flex gap-3 items-start md:flex-row flex-col">
                  <div>
                    <label className="flex items-center justify-between cursor-pointer gap-3 mb-1 text-primary font-semibold text-base underline">
                      {" "}
                      Status{" "}
                    </label>
                    <StatusFiltration filtrationProps={filtrationProps} />
                  </div>
                  <div>
                    {/* By Priority */}
                    <label className="flex items-center justify-between cursor-pointer gap-3 text-primary font-semibold text-base underline">
                      {" "}
                      Priority{" "}
                    </label>
                    <PriorityFiltration filtrationProps={filtrationProps} />
                  </div>
                </div>
              </ul>
            </div>
          </div>
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
                        issue?.priority === "high" &&
                        issue?.status === "pending"
                          ? "animate-pulse text-green-700"
                          : issue?.priority === "normal"
                          ? "text-yellow-700"
                          : "text-green-700"
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
                    <span>
                      <button
                        className="btn btn-sm btn-accent text-black "
                        onClick={() => handleEditIssues(issue)}
                      >
                        Edit
                      </button>
                    </span>
                    {/* Details Button */}
                    <Link
                      className="btn btn-warning btn-sm text-black"
                      to={`/issue/${issue?._id}`}
                    >
                      Details
                    </Link>
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
