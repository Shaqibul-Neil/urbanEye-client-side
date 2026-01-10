import useBlockUnblockUser from "../../../hooks/admin related/useBlockUnblockUser";
import Swal from "sweetalert2";
import { CircleCheckBig, PencilOff } from "lucide-react";
import toast from "react-hot-toast";

const AdminCitizenTable = ({
  title,
  data = [],
  loading = false,
  showActions = true,
  limit = null,
  className = "",
}) => {
  // Limit data if specified
  const displayData = limit ? data.slice(0, limit) : data;

  // Patch mutation
  const { mutateAsync: blockUnblock } = useBlockUnblockUser();

  const handleBlockUnblock = async (status, citizen) => {
    try {
      const userInfo = { status, id: citizen._id };
      const result = await Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#10b981",
        cancelButtonColor: "#ef4444",
        confirmButtonText: "Yes",
      });
      if (!result.isConfirmed) return;
      const res = await blockUnblock(userInfo);
      if (res?.user?.modifiedCount) {
        await Swal.fire({
          title: `${status ? "Blocked" : "Unblocked"}`,
          text: `${citizen?.displayName} has been ${
            status ? "Blocked" : "Unblocked"
          }`,
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (loading) {
    return (
      <div className={`w-full bg-white p-4 rounded-3xl ${className}`}>
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
    <div className={`w-full bg-white p-4 rounded-3xl ${className}`}>
      {title && (
        <h3 className="text-lg text-secondary font-bold mb-4">{title}</h3>
      )}

      {displayData.length === 0 ? (
        <p className="text-center py-6 text-gray-500">No citizens found</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200">
          <table className="table table-zebra w-full min-w-[700px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 border-b-2 border-blue-600/20">No</th>
                <th className="py-3 px-4 border-b-2 border-blue-600/20 sticky left-0 z-10">
                  Name
                </th>
                <th className="py-3 px-4 border-b-2 border-blue-600/20">
                  Email
                </th>
                <th className="py-3 px-4 border-b-2 border-blue-600/20">
                  Subscription
                </th>
                {showActions && (
                  <th className="py-3 px-4 border-b-2 border-blue-600/20 text-center">
                    Admin Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {displayData.map((user, i) => (
                <tr
                  key={user?._id}
                  className={`transition-all duration-300 hover:shadow-md ${
                    i % 2 === 0 ? "bg-gray-100" : "bg-white"
                  }`}
                >
                  <th
                    className={`py-3 px-4 border-l-4 ${
                      user.isBlocked
                        ? " border-l-red-400"
                        : "border-l-[#6EE7B7]"
                    }`}
                  >
                    {i + 1}
                  </th>
                  <td className="py-3 px-4 sticky left-0 z-10">
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12 transition-transform duration-300 hover:scale-110">
                          <img
                            src={user?.photoURL}
                            alt={user?.displayName}
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-extrabold text-gray-800 md:text-base text-sm">
                          {user?.displayName}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-gray-600">{user.email}</span>
                  </td>

                  <td className="py-3 px-4">
                    <span
                      className={`${
                        user?.isPremium
                          ? "text-green-600 font-semibold"
                          : "text-gray-500 font-medium"
                      }`}
                    >
                      {user?.isPremium ? "Subscribed" : "Not Subscribed"}
                    </span>
                  </td>
                  {showActions && (
                    <td className="py-3 px-4">
                      <div className="w-10 mx-auto">
                        {user?.isBlocked ? (
                          <button
                            className="w-8 h-8 bg-green-100 rounded-full flex justify-center items-center cursor-pointer hover:scale-105 transition-transform duration-200"
                            onClick={() => handleBlockUnblock(false, user)}
                            data-tooltip-id="global-tooltip"
                            data-tooltip-content="Unblock User"
                          >
                            <CircleCheckBig
                              size={18}
                              strokeWidth={2.5}
                              className="w-4 h-4 text-success"
                            />{" "}
                          </button>
                        ) : (
                          <button
                            className="w-8 h-8 bg-red-100 rounded-full flex justify-center items-center cursor-pointer hover:scale-105 transition-transform duration-200"
                            onClick={() => handleBlockUnblock(true, user)}
                            data-tooltip-id="global-tooltip"
                            data-tooltip-content="Block User"
                          >
                            <PencilOff
                              size={16}
                              strokeWidth={2.5}
                              className="w-4 h-4 text-error"
                            />{" "}
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminCitizenTable;
