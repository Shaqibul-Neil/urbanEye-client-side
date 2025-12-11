import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/auth & role/useAxiosSecure";
import useAuth from "../../../hooks/auth & role/useAuth";
import Heading from "../../../components/common/heading/Heading";
import SubHeading from "../../../components/common/heading/SubHeading";
import useBlockUnblockUser from "../../../hooks/admin related/useBlockUnblockUser";
import Swal from "sweetalert2";
import { CircleCheckBig, PencilOff } from "lucide-react";
import toast from "react-hot-toast";
import ErrorComponent from "../../../components/error/error page/ErrorComponent";
import Loading from "../../../components/loading/Loading";

const ManageCitizens = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // fetching all users data
  const {
    data: users = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["all-users", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      console.log(res.data.users);
      return res?.data?.users;
    },
  });

  // patch mutation
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
        });
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  if (isLoading) return <Loading />;
  if (isError) return <ErrorComponent />;
  return (
    <div className="lg:px-5 md:px-3 px-1 py-6">
      {/* Title Section */}
      <div className="space-y-2 mb-6">
        <Heading
          label="Citizen Oversight"
          className="text-4xl md:text-5xl pb-1"
        />
        <SubHeading
          label="Monitor and manage all registered citizens. Block or unblock users, view their profiles, and remove accounts as needed—all from one place."
          className="text-gray-600 animate-fadeInLeft delay-100"
        />
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200">
        <table className="table table-zebra w-full min-w-[700px]">
          {/* head */}
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 border-b-2 border-blue-600/20">No</th>
              <th className="py-3 px-4 border-b-2 border-blue-600/20 sticky left-0 z-10">
                Name
              </th>
              <th className="py-3 px-4 border-b-2 border-blue-600/20">Email</th>
              <th className="py-3 px-4 border-b-2 border-blue-600/20">
                Subscription
              </th>
              <th className="py-3 px-4 border-b-2 border-blue-600/20">
                Admin Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr
                key={user?._id}
                className={`transition-all duration-300 hover:scale-[1.01] hover:shadow-md ${
                  user.isBlocked && "bg-[#F9E5E5] hover:bg-red-100"
                }`}
              >
                <th
                  className={`py-3 px-4 border-l-4 ${
                    user.isBlocked ? " border-l-red-400" : "border-l-[#6EE7B7]"
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
                      <div className="font-extrabold text-gray-800 text-base">
                        {user?.displayName}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className="font-semibold text-gray-700">Email: </span>
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
                <td className="py-3 px-4 space-x-2">
                  {user?.isBlocked ? (
                    <button
                      className="btn btn-success btn-sm text-white w-24 flex items-center gap-1 transition-transform duration-200 hover:scale-105"
                      onClick={() => handleBlockUnblock(false, user)}
                    >
                      <CircleCheckBig
                        size={18}
                        color="#ffffff"
                        strokeWidth={2}
                      />{" "}
                      Unblock
                    </button>
                  ) : (
                    <button
                      className="btn btn-error btn-sm text-white w-24 flex items-center gap-1 transition-transform duration-200 hover:scale-105"
                      onClick={() => handleBlockUnblock(true, user)}
                    >
                      <PencilOff size={16} color="#ffffff" strokeWidth={1.5} />{" "}
                      Block
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCitizens;
