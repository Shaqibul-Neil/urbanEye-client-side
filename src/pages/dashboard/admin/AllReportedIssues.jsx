import Heading from "../../../components/common/heading/Heading";
import SubHeading from "../../../components/common/heading/SubHeading";
import useGetIssues from "../../../hooks/citizen related/useGetIssues";

const AllReportedIssues = () => {
  //dependencies
  const { issues, isLoading, isError } = useGetIssues();
  console.log(issues);
  return (
    <div className="px-5">
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
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>No</th>
                <th>Issue Details</th>
                <th>Issue Category</th>
                <th>Issue Priority</th>
                <th>Issue Status</th>
                <th>Staff Assigned</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {issues.map((issue, i) => (
                <tr key={issue._id}>
                  <th>{i + 1}</th>
                  <td>
                    <p>{issue?.title}</p>
                    <p>
                      <span className="font-semibold">Reported By : </span>
                      {issue?.userEmail}
                    </p>
                    <p>
                      <span className="font-semibold">Location : </span>
                      {issue?.location}
                    </p>
                  </td>
                  <td>{issue?.category}</td>
                  <td>
                    <p
                      className={`badge text-secondary uppercase badge-sm font-semibold ${
                        issue?.priority === "normal"
                          ? "badge-accent"
                          : "badge-success"
                      }`}
                    >
                      {issue?.priority}
                    </p>
                  </td>

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
                      {issue?.status}
                    </p>
                  </td>
                  <td>{issue?.assigned ? "Yes" : "No"}</td>
                  <td>
                    <button className="btn btn-primary btn-sm text-white">
                      Assign Staff
                    </button>
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

export default AllReportedIssues;
