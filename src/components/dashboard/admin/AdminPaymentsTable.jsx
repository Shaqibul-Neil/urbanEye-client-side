import { formatDate } from "../../../utilities/formatDate";

const AdminPaymentsTable = ({ 
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
              <div className="w-full h-4 bg-gray-200 rounded"></div>
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
          No payments found
        </p>
      ) : (
        <table className="table w-full">
          <thead>
            <tr>
              <th>No</th>
              <th>Citizen Email</th>
              <th>Payment Type</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Transaction Id</th>
            </tr>
          </thead>
          <tbody>
            {data.map((payment, index) => (
              <tr key={payment._id}>
                <td>{index + 1}</td>
                
                {/* Citizen Email */}
                <td>
                  <span className="text-sm font-medium">{payment?.userEmail}</span>
                </td>

                {/* Payment Type */}
                <td>
                  <span className="badge badge-outline badge-info text-xs font-semibold">
                    {payment?.paymentType || 'Online'}
                  </span>
                </td>

                {/* Amount */}
                <td>
                  <span className="text-sm font-bold text-green-600">
                    ৳ {payment?.amount}
                  </span>
                </td>

                {/* Date */}
                <td>
                  <span className="text-sm">
                    {payment?.createdAt ? formatDate(payment.createdAt) : 'N/A'}
                  </span>
                </td>

                {/* Transaction Id */}
                <td>
                  <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">
                    {payment?.transactionId || payment?.tran_id || 'N/A'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminPaymentsTable;