import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/auth & role/useAxiosSecure";
import Loading from "../../../components/loading/Loading";
import ErrorPage from "../../../components/error/error page/ErrorPage";
import { getBg } from "../../../utilities/getStatusBadge";
import AdminPaymentChart from "../../../components/dashboard/payment chart/AdminPaymentChart";
import useAggregatePayment from "../../../hooks/payment related/useAggregatePayment";
import useIssueAggregate from "../../../hooks/citizen related/useIssueAggregate";
import IssueMetrics from "../../../components/dashboard/issue metrics/IssueMetrics";

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();
  //issue status fetch data aggregation
  const { statusStats, isLoading, isError } = useIssueAggregate();
  //total payments data aggregation
  const { paymentStats, paymentLoading, paymentError } = useAggregatePayment();
  const issueCount = statusStats?.reduce(
    (accu, stats) => accu + stats.count,
    0
  );

  //latest issue for admin dashboard
  const {
    data: latestIssue = [],
    isLoading: latestLoading,
    isError: latestError,
  } = useQuery({
    queryKey: ["latest-issue"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/issues/latest/admin");
      return data?.issue;
    },
  });

  //latest registered users
  const {
    data: latestUsers = [],
    isLoading: latestUsersLoading,
    isError: latestUsersError,
  } = useQuery({
    queryKey: ["latest-user"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/users/latest/registered-users");
      console.log(data);
      return data?.user;
    },
  });
  if (isLoading || paymentLoading || latestLoading || latestUsersLoading)
    return <Loading />;
  if (isError || paymentError || latestError || latestUsersError)
    return <ErrorPage />;
  return (
    <div className="grid lg:grid-cols-4 gap-4 px-5">
      {/* Left Side Stats */}
      <div className="lg:col-span-3 space-y-8">
        {/* Issue Status Cards */}
        <div className="bg-white p-6 rounded-3xl space-y-4">
          <h2 className="text-lg text-secondary font-bold">
            Issue Metrics{" "}
            <p className="font-normal">Total Submitted Issues: {issueCount}</p>
          </h2>

          <div className="grid md:grid-cols-3 gap-2">
            {statusStats.map((stat, i) => (
              <IssueMetrics key={i} stat={stat} />
            ))}
          </div>
        </div>

        {/* Payments Grid */}
        <div className="col-span-3">
          <AdminPaymentChart paymentStats={paymentStats} />
        </div>
      </div>

      {/* Right Side */}

      <div className="space-y-6 p-6 rounded-3xl flex gap-3 lg:flex-col md:flex-row flex-col">
        {/* Latest Issues */}
        <div>
          <div className=" space-y-4">
            <h3 className="text-lg text-secondary font-bold">
              Latest Posted Issues
            </h3>
            <div>
              {latestIssue.map((latest) => (
                <div
                  key={latest._id}
                  className="flex items-center gap-4 p-2 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer transform hover:-translate-y-1 bg-white my-3"
                >
                  {/* Profile / Photo */}
                  <div className="shrink-0 w-12 h-12">
                    <img
                      src={latest?.photoURL}
                      alt={latest?.title}
                      className="w-full h-full object-cover rounded-full border-2 border-primary"
                    />
                  </div>

                  {/* Text */}
                  <div className="flex flex-col justify-center">
                    <h3 className="text-sm text-secondary">{latest?.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {latest?.userEmail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Latest Registered Users */}
        <div>
          <div className="space-y-4">
            <h3 className="text-lg text-secondary font-bold">
              Latest Registered Users
            </h3>
            <div>
              {latestUsers.map((latest) => (
                <div
                  key={latest._id}
                  className="flex items-center gap-4 p-2 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer transform hover:-translate-y-1 bg-white my-3"
                >
                  {/* Profile / Photo */}
                  <div className="shrink-0 w-12 h-12">
                    <img
                      src={latest?.photoURL}
                      alt={latest?.displayName}
                      className="w-full h-full object-cover rounded-full border-2 border-primary"
                    />
                  </div>

                  {/* Text */}
                  <div className="flex flex-col justify-center">
                    <h3 className="text-sm text-secondary">
                      {latest?.displayName}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {latest?.email}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Latest Payments */}
      </div>
    </div>
  );
};

export default AdminDashboard;
