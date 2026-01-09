import { formatDate } from "../../../utilities/formatDate";

const IssuesTable = ({ 
  title, 
  data = [], 
  loading = false,
  viewAllLink,
  className = ""
}) => {
  if (loading) {
    return (
      <div className={`w-full overflow-x-auto bg-white p-4 rounded-3xl ${className}`}>
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
    <div className={`w-full overflow-x-auto bg-white p-4 rounded-3xl ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg text-secondary font-bold">{title}</h3>
        {viewAllLink && (
          <a
            href={viewAllLink}
            className="underline text-primary text-sm hover:text-primary/80"
          >
            View All
          </a>
        )}
      </div>
      
      {data.length === 0 ? (
        <p className="text-center py-6 text-gray-500">
          No issues found
        </p>
      ) : (
        <table className="table w-full">
          <thead>
            <tr>
              <th>SL</th>
              <th>Issue</th>
              <th>Reporter</th>
              <th>Location</th>
              <th className="text-center">Status</th>
              <th className="text-center">Date</th>
            </tr>
          </thead>
          <tbody>
            {data.map((issue, index) => (
              <tr key={issue._id}>
                <td>{index + 1}</td>
                
                {/* Issue Info */}
                <td className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask rounded-lg h-12 w-12">
                      <img
                        src={issue?.photoURL || "https://via.placeholder.com/48"}
                        alt={issue?.title}
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-medium text-sm">{issue?.title}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {issue?.category}
                    </div>
                  </div>
                </td>

                {/* Reporter */}
                <td>
                  <div className="text-sm">{issue?.userEmail?.split('@')[0]}</div>
                  <div className="text-xs text-gray-500">{issue?.userEmail}</div>
                </td>

                {/* Location */}
                <td>
                  <span className="text-sm">{issue?.location?.split(',')[0]}</span>
                  {issue?.location?.split(',')[1] && (
                    <>
                      <br />
                      <span className="text-xs text-gray-500">
                        {issue?.location?.split(',')[1]}
                      </span>
                    </>
                  )}
                </td>

                {/* Status */}
                <td className="text-center">
                  {issue.status === "pending" ? (
                    <span className="badge badge-outline badge-warning text-xs font-semibold">
                      {issue.status}
                    </span>
                  ) : issue.status === "resolved" ? (
                    <span className="badge badge-outline badge-success text-xs font-semibold">
                      {issue.status}
                    </span>
                  ) : issue.status === "in-progress" ? (
                    <span className="badge badge-outline badge-info text-xs font-semibold">
                      {issue.status}
                    </span>
                  ) : (
                    <span className="badge badge-outline badge-error text-xs font-semibold">
                      {issue.status}
                    </span>
                  )}
                </td>

                {/* Date */}
                <td className="text-center">
                  <div className="text-sm">
                    {issue?.createdAt ? formatDate(issue.createdAt) : 'N/A'}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default IssuesTable;