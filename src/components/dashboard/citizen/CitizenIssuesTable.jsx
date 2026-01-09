import { formatDate } from "../../../utilities/formatDate";

const CitizenIssuesTable = ({ 
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
              <th>#</th>
              <th>Issue Details & Location</th>
              <th>Category</th>
              <th>Priority</th>
              <th className="text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((issue, index) => (
              <tr key={issue._id}>
                <td>{index + 1}</td>
                
                {/* Issue Details & Location */}
                <td>
                  <div className="flex items-center gap-3">
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
                        {issue?.location?.split(',')[0]}
                        {issue?.location?.split(',')[1] && (
                          <span className="block">
                            {issue?.location?.split(',')[1]}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Category */}
                <td>
                  <span className="text-sm font-medium">{issue?.category}</span>
                </td>

                {/* Priority */}
                <td>
                  <span className={`badge badge-outline text-xs font-semibold ${
                    issue?.priority === 'high' ? 'badge-error' :
                    issue?.priority === 'medium' ? 'badge-warning' :
                    'badge-info'
                  }`}>
                    {issue?.priority || 'Normal'}
                  </span>
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
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CitizenIssuesTable;