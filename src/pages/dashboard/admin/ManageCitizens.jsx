import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/auth & role/useAxiosSecure";
import useAuth from "../../../hooks/auth & role/useAuth";
import Heading from "../../../components/common/heading/Heading";
import SubHeading from "../../../components/common/heading/SubHeading";
import useBlockUnblockUser from "../../../hooks/admin related/useBlockUnblockUser";
import Swal from "sweetalert2";

const ManageCitizens = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  //fetching all users data
  const { data: users = [] } = useQuery({
    queryKey: ["all-users", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      console.log(res.data.users);
      return res?.data?.users;
    },
  });

  //patch mutation
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
      console.log(error);
    }
  };
  return (
    <div className="px-5">
      <div className="space-y-12">
        {/* Title Section */}
        <div className="space-y-2">
          <Heading label={"Citizen Oversight"} />
          <SubHeading
            label={
              "Monitor and manage all registered citizens. Block or unblock users, view their profiles, and remove accounts as needed—all from one place."
            }
          />
        </div>
        {/* Table Section */}
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Subscription</th>
                <th>Admin Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => (
                <tr key={user?._id}>
                  <th>{i + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={user?.photoURL} alt={user?.displayName} />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{user?.displayName}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="font-semibold">Email :</span> {user.email}
                    <br />
                  </td>

                  <td>{user?.isPremium ? "Subscribed" : "Not Subscribed"}</td>
                  <td className="space-x-1">
                    {user?.isBlocked ? (
                      <button
                        className="btn btn-success text-black btn-sm"
                        onClick={() => handleBlockUnblock(false, user)}
                      >
                        Unblock
                      </button>
                    ) : (
                      <button
                        className="btn btn-error text-black btn-sm"
                        onClick={() => handleBlockUnblock(true, user)}
                      >
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
    </div>
  );
};

export default ManageCitizens;
