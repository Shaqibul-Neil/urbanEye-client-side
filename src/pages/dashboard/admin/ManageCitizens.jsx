import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/auth & role/useAxiosSecure";
import useAuth from "../../../hooks/auth & role/useAuth";
import Heading from "../../../components/common/heading/Heading";
import SubHeading from "../../../components/common/heading/SubHeading";
import ErrorComponent from "../../../components/error/error page/ErrorComponent";
import Loading from "../../../components/loading/Loading";
import AdminCitizenTable from "../../../components/dashboard/admin/AdminCitizenTable";

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
      return res?.data?.users;
    },
  });

  if (isLoading) return <Loading />;
  if (isError) return <ErrorComponent />;

  return (
    <div className="lg:px-5 px-3 py-6 bg-white max-w-[95%] mx-auto rounded-3xl">
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
      <AdminCitizenTable
        data={users}
        loading={isLoading}
        showActions={true}
        className="shadow-none p-0"
      />
    </div>
  );
};

export default ManageCitizens;
