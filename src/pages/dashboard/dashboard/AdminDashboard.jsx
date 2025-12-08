import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/auth & role/useAxiosSecure";
import Loading from "../../../components/loading/Loading";
import ErrorPage from "../../../components/error/error page/ErrorPage";
import { getBg } from "../../../utilities/getStatusBadge";
import {
  XCircle,
  Loader,
  Zap,
  CheckCircle2,
  Hourglass,
  FileMinusIcon,
} from "lucide-react";
import AdminPaymentChart from "../../../components/dashboard/payment chart/AdminPaymentChart";

const statusIcons = {
  rejected: <XCircle className="w-8 h-8 text-red-800" />,
  pending: <Hourglass className="w-8 h-8 text-yellow-800" />,
  "in-progress": <Loader className="w-8 h-8 text-blue-800" />,
  working: <Zap className="w-8 h-8 text-purple-800" />,
  resolved: <CheckCircle2 className="w-8 h-8 text-green-800" />,
  closed: <FileMinusIcon className="w-8 h-8 text-gray-800" />,
};

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: statusStats = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["status-stats"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/issues/admin/stats/status");
      return data?.result;
    },
  });
  const {
    data: paymentStats = [],
    isLoading: paymentLoading,
    isError: paymentError,
  } = useQuery({
    queryKey: ["payment-stats"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/payments/stats/total");
      console.log(data);
      return data;
    },
  });
  if (isLoading || paymentLoading) return <Loading />;
  if (isError || paymentError) return <ErrorPage />;
  return (
    <div className="grid lg:grid-cols-4 gap-8">
      {/* Left Side Stats */}
      <div className="lg:col-span-3 space-y-12">
        {/* Issue Status Cards */}
        <div className="grid md:grid-cols-3 gap-6 px-2 md:px-4 mt-10">
          {statusStats.map((stat, i) => (
            <div
              key={i}
              className={`relative p-5 md:p-6 rounded-3xl shadow-2xl flex flex-col items-center justify-center transition-transform duration-500 hover:scale-105 ${getBg(
                stat._id
              )} text-secondary mb-4`}
            >
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 rounded-full p-2">
                {statusIcons[stat._id]}
              </div>
              {/* Count */}
              <h4 className="text-3xl md:text-4xl font-extrabold mb-2 mt-1">
                {stat.count}
              </h4>
              <p className="text-sm md:text-base capitalize tracking-wide font-medium">
                Issue {stat._id.replace("-", " ")}
              </p>
            </div>
          ))}
        </div>

        {/* Payments Grid */}
        <div className="col-span-3 px-2 md:px-4">
          <AdminPaymentChart paymentStats={paymentStats} />
        </div>
      </div>

      {/* Right Side */}
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-red-400 to-red-600 rounded-xl shadow-lg p-6 hover:scale-105 transition-transform duration-500 text-white h-48 flex items-center justify-center font-semibold">
          Latest Issues
        </div>
        <div className="bg-gradient-to-r from-green-400 to-green-600 rounded-xl shadow-lg p-6 hover:scale-105 transition-transform duration-500 text-white h-48 flex items-center justify-center font-semibold">
          Latest Registered Users
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
