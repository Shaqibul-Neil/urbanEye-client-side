const AdminUsersTable = ({ 
  title, 
  data = [], 
  loading = false,
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
      <h3 className="text-lg text-secondary font-bold mb-4">{title}</h3>
      
      {data.length === 0 ? (
        <p className="text-center py-6 text-gray-500">
          No users found
        </p>
      ) : (
        <table className="table w-full">
          <thead>
            <tr>
              <th>No</th>
              <th>Name & Image</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                
                {/* Name & Image */}
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask rounded-full h-12 w-12">
                        <img
                          src={user?.photoURL || user?.image || "https://via.placeholder.com/48"}
                          alt={user?.name || user?.displayName}
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-medium text-sm">
                        {user?.name || user?.displayName || 'Anonymous'}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Email */}
                <td>
                  <span className="text-sm">{user?.email}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminUsersTable;