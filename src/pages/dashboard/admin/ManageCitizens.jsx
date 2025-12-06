import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/auth & role/useAxiosSecure";
import useAuth from "../../../hooks/auth & role/useAuth";
import Heading from "../../../components/common/heading/Heading";
import SubHeading from "../../../components/common/heading/SubHeading";

const ManageCitizens = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: users = [] } = useQuery({
    queryKey: ["all-users", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      console.log(res.data.users);
      return res?.data?.users;
    },
  });
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
                      <button className="btn btn-success text-black btn-sm">
                        Unblock
                      </button>
                    ) : (
                      <button className="btn btn-error text-black btn-sm">
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
