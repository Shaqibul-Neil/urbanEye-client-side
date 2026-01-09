import { formatDate } from "../../../utilities/formatDate";

const DataTable = ({ 
  title, 
  data = [], 
  type = "issues", // issues, users, payments
  loading = false,
  viewAllLink,
  className = ""
}) => {
  if (loading) {
    return (
      <div className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 ${className}`}>
        <h3 className="text-lg text-secondary font-bold mb-4">{title}</h3>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse flex items-center gap-4 p-2">
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

  const renderIssueItem = (item) => (
    <div
      key={item._id}
      className="flex items-center gap-4 p-2 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer transform hover:-translate-y-1 bg-white my-3"
    >
      <div className="shrink-0 w-12 h-12">
        <img
          src={item?.photoURL || "https://via.placeholder.com/48"}
          alt={item?.title}
          className="w-full h-full object-cover rounded-full border-2 border-primary"
        />
      </div>
      <div className="flex flex-col justify-center">
        <h3 className="text-sm text-secondary font-medium">{item?.title}</h3>
        <p className="text-xs text-gray-500 mt-1">
          {item?.userEmail || item?.location}
        </p>
        {item?.createdAt && (
          <p className="text-xs text-gray-400">
            {formatDate(item.createdAt)}
          </p>
        )}
      </div>
    </div>
  );

  const renderUserItem = (item) => (
    <div
      key={item._id}
      className="flex items-center gap-4 p-2 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer transform hover:-translate-y-1 bg-white my-3"
    >
      <div className="shrink-0 w-12 h-12">
        <img
          src={item?.photoURL || item?.staffPhotoURL || "https://via.placeholder.com/48"}
          alt={item?.displayName || item?.staffName}
          className="w-full h-full object-cover rounded-full border-2 border-primary"
        />
      </div>
      <div className="flex flex-col justify-center">
        <h3 className="text-sm text-secondary font-medium">
          {item?.displayName || item?.staffName}
        </h3>
        <p className="text-xs text-gray-500 mt-1">
          {item?.email || item?.staffEmail}
        </p>
        {item?.createdAt && (
          <p className="text-xs text-gray-400">
            {formatDate(item.createdAt)}
          </p>
        )}
      </div>
    </div>
  );

  const renderPaymentItem = (item) => (
    <div
      key={item._id}
      className="flex items-center gap-4 p-2 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer transform hover:-translate-y-1 bg-white my-3"
    >
      <div className="shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
        <span className="text-green-600 font-bold text-lg">৳</span>
      </div>
      <div className="flex flex-col justify-center">
        <h3 className="text-sm text-secondary font-medium">
          ৳{item?.amount} - {item?.paymentType}
        </h3>
        <p className="text-xs text-gray-500 mt-1">
          {item?.citizenEmail}
        </p>
        {item?.paidAt && (
          <p className="text-xs text-gray-400">
            {formatDate(item.paidAt)}
          </p>
        )}
      </div>
    </div>
  );

  const renderItem = (item) => {
    switch (type) {
      case "users":
        return renderUserItem(item);
      case "payments":
        return renderPaymentItem(item);
      default:
        return renderIssueItem(item);
    }
  };

  return (
    <div className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 ${className}`}>
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
      
      <div className="space-y-2">
        {data.length === 0 ? (
          <p className="text-center py-6 text-gray-500">
            No {type} found
          </p>
        ) : (
          data.map(renderItem)
        )}
      </div>
    </div>
  );
};

export default DataTable;