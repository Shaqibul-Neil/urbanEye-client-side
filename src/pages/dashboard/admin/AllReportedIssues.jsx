import { UserPlus, XCircle } from "lucide-react";
import Heading from "../../../components/common/heading/Heading";
import SubHeading from "../../../components/common/heading/SubHeading";
import useGetIssues from "../../../hooks/citizen related/useGetIssues";
import { useRef, useState } from "react";
import AssignStaffModal from "../../../components/modals/AssignStaffModal";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/auth & role/useAxiosSecure";

const AllReportedIssues = () => {
  const { issues, isLoading, isError } = useGetIssues();
  const axiosSecure = useAxiosSecure();
  const [assignedStaffIssue, setAssignedStaffIssue] = useState();

  const assignModalRef = useRef();

  const {
    data: staffs = [],
    isLoading: staffLoading,
    isError: staffError,
    refetch: staffRefetch,
  } = useQuery({
    queryKey: ["all-staffs", "available"],
    enabled: !!assignedStaffIssue,
    queryFn: async () => {
      const { data } = await axiosSecure.get("/staff?workStatus=available");
      return data.staff;
    },
  });
  //assign staff modal
  const handleAssignStaffModal = (issue) => {
    setAssignedStaffIssue(issue);
    assignModalRef.current.showModal();
  };

  return (
    <div className="lg:px-5 md:px-3 px-1 py-6">
      <div className="space-y-12">
        {/* Title Section */}
        <div className="space-y-2">
          <Heading label={"All Reported Issues"} />
          <SubHeading
            label={
              "View and manage all reported issues across the platform. Track status, priority, and take necessary actions as an administrator."
            }
          />
        </div>

        {/* Table Section */}
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
                <th className="py-3 px-4 border-b-2 border-gray-200 w-36">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {issues.map((issue, i) => (
                <tr
                  key={issue._id}
                  className={`transition-all duration-300 hover:scale-[1.01] hover:shadow-md ${
                    issue?.isAssignedStaff && "bg-[#E5F9E8] hover:bg-green-100"
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
                      className={`badge uppercase badge-sm text-secondary font-semibold ${
                        issue?.priority === "normal"
                          ? "badge-accent badge-outline"
                          : "badge-success"
                      }`}
                    >
                      {issue?.priority}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`font-semibold uppercase ${
                        issue.status === "pending"
                          ? "text-warning"
                          : issue.status === "in-progress"
                          ? "text-primary"
                          : "text-success"
                      }`}
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
                  <td className="py-3 px-4 space-y-1">
                    {!issue?.isAssignedStaff && (
                      <button
                        className="btn btn-primary w-24 btn-sm text-white transition-transform duration-200 hover:scale-105"
                        onClick={() => handleAssignStaffModal(issue)}
                      >
                        <UserPlus size={16} color="#ffffff" strokeWidth={1.5} />{" "}
                        Assign
                      </button>
                    )}
                    {/* Reject Button */}
                    {issue?.status === "pending" && (
                      <button className="btn btn-error btn-sm text-white w-24">
                        <XCircle size={16} color="#ffffff" strokeWidth={1.5} />{" "}
                        Reject
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal Section */}
        <AssignStaffModal
          assignModalRef={assignModalRef}
          assignedStaffIssue={assignedStaffIssue}
          staffs={staffs}
        />
      </div>
    </div>
  );
};

export default AllReportedIssues;
