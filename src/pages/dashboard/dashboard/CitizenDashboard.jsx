import { Link } from "react-router";
import IssueMetrics from "../../../components/dashboard/issue metrics/IssueMetrics";
import AdminPaymentChart from "../../../components/dashboard/payment chart/AdminPaymentChart";
import ErrorComponent from "../../../components/error/error page/ErrorComponent";
import Loading from "../../../components/loading/Loading";
import useIssueAggregate from "../../../hooks/citizen related/useIssueAggregate";
import useAggregatePayment from "../../../hooks/payment related/useAggregatePayment";
import useLatestPayments from "../../../hooks/payment related/useLatestPayments";
import LatestPayments from "../../../components/dashboard/payment chart/LatestPayments";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/auth & role/useAxiosSecure";
import useAuth from "../../../hooks/auth & role/useAuth";
import LatestIssue from "../../../components/dashboard/issue metrics/LatestIssue";
import NotSubscribed from "../../../components/dashboard/issue metrics/NotSubscribed";

const CitizenDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  //total payments data aggregation
  const { paymentStats, paymentLoading, paymentError } = useAggregatePayment();
  const { statusStats, isLoading, isError } = useIssueAggregate();
  const { latestPayments, latestLoading, latestError } = useLatestPayments();
  const issueCount = statusStats?.reduce(
    (accu, stats) => accu + stats.count,
    0
  );

  //get latest 3 issue by user
  const {
    data: latestIssue = [],
    isLoading: issueLoading,
    isError: issueError,
  } = useQuery({
    queryKey: ["my-issues", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/issues/my-issues?limit=3");
      return res?.data?.issue;
    },
  });
  if (paymentLoading || isLoading || latestLoading || issueLoading)
    return <Loading />;
  if (paymentError || isError || latestError || issueError)
    return <ErrorComponent />;
  return (
    <div className="grid lg:grid-cols-4 gap-4 px-5">
      {/* Left Side Stats */}
      <div className="lg:col-span-3 space-y-8">
        {/* Issue Status Cards */}
        {/* Issue Status Cards */}
        <div className="bg-white p-6 rounded-3xl space-y-4">
          <h2 className="text-lg text-secondary font-bold">
            Issue Metrics :{" "}
            <span className="font-normal">
              Total Submitted Issues: {issueCount}
            </span>
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
            <LatestIssue latestIssue={latestIssue} />
          </div>
        </div>
        {/* Latest Payments */}
        <div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg text-secondary font-bold">
                Latest Payments
              </h3>
              <Link
                to={"/dashboard/my-payments-history"}
                className="underline text-primary text-sm"
              >
                View All
              </Link>
            </div>
            <div>
              {/* Text */}
              <LatestPayments latestPayments={latestPayments} />
            </div>
          </div>
        </div>

        {/* Haven't Subscribe Yet? */}
        <div>
          <NotSubscribed />
        </div>
      </div>
    </div>
  );
};

export default CitizenDashboard;
