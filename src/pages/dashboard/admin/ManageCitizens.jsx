import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
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
    <div className="lg:px-5 px-3 py-6 bg-white mx-5 rounded-3xl">
      {/* Title Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="flex items-center gap-4 mb-4"
      >
        <div className="w-1 h-8 bg-gradient-to-b from-primary to-accent rounded-full"></div>
        <div className="space-y-2">
          <Heading
            label="Citizen Oversight"
            className="text-3xl md:text-4xl pb-1"
          />
          <SubHeading
            label="Monitor and manage all registered citizens. Block or unblock users, view their profiles, and remove accounts as needed—all from one place."
            className="text-gray-600 animate-fadeInLeft delay-100"
          />
        </div>
      </motion.div>

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
