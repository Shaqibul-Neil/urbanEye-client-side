import { formatDate } from "../../../utilities/formatDate";

const StaffTasksTable = ({
  title,
  data = [],
  loading = false,
  className = "",
}) => {
  const hasStatus = data?.[0]?.status;
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
    <div
      className={`w-full overflow-x-auto bg-white p-4 rounded-3xl ${className}`}
    >
      <h3 className="text-lg text-secondary font-bold mb-4">{title}</h3>

      {data.length === 0 ? (
        <p className="text-center py-6 text-gray-500">No tasks found</p>
      ) : (
        <table className="table table-zebra w-full">
          <thead className="bg-gray-50">
            <tr>
              <th>#</th>
              <th>Issue Details & Location</th>
              <th>Reporter</th>
              <th>Category</th>
              <th>Priority</th>
              <th className="text-center">
                {hasStatus ? "Status" : "TrackingId"}
              </th>
              <th className="text-center">Reporting Date</th>
            </tr>
          </thead>
          <tbody>
            {data.map((task, index) => (
              <tr 
                key={task._id}
                className={`${
                  index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                }`}
              >
                <td>{index + 1}</td>

                {/* Issue Details & Location */}
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask rounded-lg h-12 w-12">
                        <img
                          src={
                            task?.photoURL || "https://via.placeholder.com/48"
                          }
                          alt={task?.title}
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-medium text-sm">{task?.title}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {task?.location?.split(",")[0]}
                        {task?.location?.split(",")[1] && (
                          <span className="block">
                            {task?.location?.split(",")[1]}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Reporter */}
                <td>
                  <div className="text-sm capitalize">
                    {task?.userEmail?.split("@")[0]}
                  </div>
                  <div className="text-xs text-gray-500">{task?.userEmail}</div>
                </td>

                {/* Category */}
                <td>
                  <span className="text-sm font-medium">{task?.category}</span>
                </td>

                {/* Priority */}
                <td>
                  <span
                    className={`badge badge-outline text-xs font-semibold capitalize ${
                      task?.priority === "high"
                        ? "badge-error"
                        : task?.priority === "medium"
                        ? "badge-warning"
                        : "badge-info"
                    }`}
                  >
                    {task?.priority || "Normal"}
                  </span>
                </td>

                {/* Status */}
                {task?.status ? (
                  <td className="text-center capitalize">
                    {task.status === "pending" ? (
                      <span className="badge badge-outline badge-warning text-xs font-semibold">
                        {task.status}
                      </span>
                    ) : task.status === "resolved" ? (
                      <span className="badge badge-outline badge-success text-xs font-semibold">
                        {task.status}
                      </span>
                    ) : task.status === "in-progress" ? (
                      <span className="badge badge-outline badge-info text-xs font-semibold">
                        {task.status}
                      </span>
                    ) : task.status === "assigned" ? (
                      <span className="badge badge-outline badge-primary text-xs font-semibold">
                        {task.status}
                      </span>
                    ) : (
                      <span className="badge badge-outline badge-error text-xs font-semibold">
                        {task.status}
                      </span>
                    )}
                  </td>
                ) : (
                  <td className="text-center">
                    <span className="text-xs text-secondary italic">
                      {task?.trackingId}
                    </span>
                  </td>
                )}

                {/* Date */}
                <td className="text-center">
                  <div className="text-sm">
                    {task?.createdAt ? formatDate(task.createdAt) : "N/A"}
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

export default StaffTasksTable;
