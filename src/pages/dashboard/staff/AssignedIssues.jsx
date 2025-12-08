import { useEffect, useState } from "react";
import Heading from "../../../components/common/heading/Heading";
import SubHeading from "../../../components/common/heading/SubHeading";
import useStaffAssignIssue from "../../../hooks/staff related/useStaffAssignIssue";

const AssignedIssues = () => {
  const [filters, setFilters] = useState({ status: "", priority: "" });
  const { assignedIssues, issuesLoading, issuesError, refetchAssignIssues } =
    useStaffAssignIssue(filters);

  useEffect(() => {
    refetchAssignIssues();
  }, [filters, refetchAssignIssues]);
  console.log(assignedIssues);
  if (issuesLoading) return <p>Loading issues...</p>;
  if (issuesError) return <p>Error fetching issues.</p>;
  return (
    <div className="lg:px-5 md:px-3 px-1 py-6">
      <div className="space-y-8">
        {/* Title */}
        <div className="space-y-2">
          <Heading label={"Assigned Issues"} />
          <SubHeading
            label={
              "View and manage all issues assigned to you. Boosted issues are prioritized automatically to ensure faster resolution."
            }
          />
        </div>

        {/* Filter Section (UI only) */}
        <div className="flex flex-wrap gap-3">
          <select
            className="select select-bordered max-w-xs py-2 px-3 bg-base-200 border border-primary rounded-xl focus:ring-1 focus:ring-primary outline-none"
            value={filters.status}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, status: e.target.value }))
            }
          >
            <option value={""}>Status: All</option>
            <option value={"in-progress"}>In Progress</option>
            <option value={"working"}>Working</option>
            <option value={"resolved"}>Resolved</option>
            <option value={"closed"}>Closed</option>
          </select>

          <select
            className="select select-bordered max-w-xs py-2 px-3 bg-base-200 border border-primary rounded-xl focus:ring-1 focus:ring-primary outline-none"
            value={filters.priority}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, priority: e.target.value }))
            }
          >
            <option value={""}>Priority: All</option>
            <option value={"high"}>High</option>
            <option value={"normal"}>Normal</option>
          </select>
          <button onClick={refetchAssignIssues}>Apply</button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200">
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

                <th className="py-3 px-4 border-b-2 border-blue-600/20">
                  Action
                </th>
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {assignedIssues.map((issue, i) => (
                <tr
                  className="transition-all duration-300 hover:scale-[1.01] hover:shadow-md bg-[#FDF6E3]"
                  key={issue?._id}
                >
                  <th className="py-3 px-4 border-l-4 border-l-yellow-400">
                    {i + 1}
                  </th>

                  {/* Sticky Issue Title */}
                  <td className="py-3 px-4 sticky left-0 z-10 bg-[#FDF6E3]">
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
                    <span className="px-3 py-1 text-xs font-bold rounded-full bg-yellow-100 text-yellow-700 uppercase">
                      {issue.priority}
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    <span className="px-3 py-1 text-xs font-bold rounded-full bg-blue-100 text-blue-700 uppercase">
                      {issue.status}
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    <select className="select select-sm select-bordered w-44 font-semibold py-2 px-3 bg-base-200 border border-primary rounded-xl focus:ring-1 focus:ring-primary outline-none">
                      <option disabled selected>
                        Change Status
                      </option>
                      <option value={"in-progress"}>In Progress</option>
                      <option value={"working"}>Working</option>
                      <option value={"resolved"}>Resolved</option>
                      <option value={"closed"}>Closed</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AssignedIssues;
