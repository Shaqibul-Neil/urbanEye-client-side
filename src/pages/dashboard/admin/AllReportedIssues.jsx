import { Search, UserPlus, XCircle } from "lucide-react";
import Heading from "../../../components/common/heading/Heading";
import SubHeading from "../../../components/common/heading/SubHeading";
import useGetIssues from "../../../hooks/citizen related/useGetIssues";
import { useEffect, useRef, useState } from "react";
import AssignStaffModal from "../../../components/modals/AssignStaffModal";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/auth & role/useAxiosSecure";
import { getBg, getStatusBadge } from "../../../utilities/getStatusBadge";
import useIssueReject from "../../../hooks/admin related/useIssueReject";
import Swal from "sweetalert2";
import Loading from "../../../components/loading/Loading";
import ErrorComponent from "../../../components/error/error page/ErrorComponent";

const AllReportedIssues = () => {
  const [searchText, setSearchText] = useState();
  const [assignedStaffIssue, setAssignedStaffIssue] = useState();
  const [selectedStaff, setSelectedStaff] = useState({});
  const [debouncedSearch, setDebouncedSearch] = useState(searchText);
  const assignModalRef = useRef();
  //wait 1s after user stopped typing and then send the signal to backend to fetch
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchText);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchText]);

  const { issues, isLoading, isError } = useGetIssues(debouncedSearch);
  const axiosSecure = useAxiosSecure();
  const {
    data: staffs = [],
    isLoading: staffLoading,
    isError: staffError,
    refetch: staffRefetch,
  } = useQuery({
    queryKey: ["all-staffs", "available"],
    enabled: !!assignedStaffIssue,
    queryFn: async () => {
      const { data } = await axiosSecure.get("/staff");
      return data.staff;
    },
  });

  //assign staff modal
  const handleAssignStaffModal = (issue) => {
    setSelectedStaff({});
    // staffRefetch();
    setAssignedStaffIssue(issue);
    // reset selected staff
    // setSelectedStaff({});
    // staffRefetch();
    assignModalRef.current.showModal();
  };

  //reject mutation
  const { mutateAsync: issueReject } = useIssueReject();

  //issue reject
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
      //console.log(res);
      if (res?.issue?.modifiedCount) {
        await Swal.fire({
          title: "Rejected",
          text: `${issue?.title} has been rejected`,
          icon: "success",
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

  if (staffLoading || isLoading) return <Loading />;
  if (isError || staffError) return <ErrorComponent />;
  return (
    <div className="lg:px-5 md:px-3 px-1 py-6">
      <div className="space-y-12">
        {/* Title Section */}

        <div className="space-y-2">
          <Heading
            className={"text-4xl md:text-5xl"}
            label={"All Reported Issues"}
          />
          <SubHeading
            label={
              "View and manage all reported issues across the platform. Track status, priority, and take necessary actions as an administrator."
            }
          />
        </div>

        {/* Search Section */}
        <div className="flex md:justify-end justify-center mb-4">
          <div className="relative w-full max-w-xs">
            <input
              type="search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search..."
              className="w-full py-2 pl-10 pr-3 bg-gray-100 border border-primary rounded-xl focus:ring-secondary focus:border-secondary focus:outline-none focus:ring-1"
            />
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-primary"
            />
          </div>
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
                    issue?.priority === "high" &&
                    !issue?.isAssignedStaff &&
                    "animate-pulse"
                  } ${getBg(issue?.status)}`}
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
                  <td className="py-3 px-4 space-y-1">
                    {issue?.status === "pending" && !issue?.isAssignedStaff ? (
                      <>
                        <button
                          className="btn btn-primary w-24 btn-sm text-white transition-transform duration-200 hover:scale-105"
                          onClick={() => handleAssignStaffModal(issue)}
                        >
                          <UserPlus
                            size={16}
                            color="#ffffff"
                            strokeWidth={1.5}
                          />{" "}
                          Assign
                        </button>

                        <button
                          className="btn btn-error btn-sm text-white w-24"
                          onClick={() => handleReject(issue)}
                        >
                          <XCircle
                            size={16}
                            color="#ffffff"
                            strokeWidth={1.5}
                          />{" "}
                          Reject
                        </button>
                      </>
                    ) : issue.status === "rejected" ? (
                      <span className="px-3 py-1 text-sm font-bold rounded-full bg-red-100 text-red-700">
                        Issue Rejected
                      </span>
                    ) : (
                      <span className="px-3 py-1 text-sm font-bold rounded-full bg-green-100 text-green-700">
                        Assigned
                      </span>
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
          staffRefetch={staffRefetch}
          selectedStaff={selectedStaff}
          setSelectedStaff={setSelectedStaff}
        />
      </div>
    </div>
  );
};

export default AllReportedIssues;
