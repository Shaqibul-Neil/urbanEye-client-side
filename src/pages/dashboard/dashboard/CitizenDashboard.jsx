import IssueMetrics from "../../../components/dashboard/issue metrics/IssueMetrics";
import AdminPaymentChart from "../../../components/dashboard/payment chart/AdminPaymentChart";
import ErrorComponent from "../../../components/error/error page/ErrorComponent";
import Loading from "../../../components/loading/Loading";
import useIssueAggregate from "../../../hooks/citizen related/useIssueAggregate";
import useAggregatePayment from "../../../hooks/payment related/useAggregatePayment";

const CitizenDashboard = () => {
  //total payments data aggregation
  const { paymentStats, paymentLoading, paymentError } = useAggregatePayment();
  const { statusStats, isLoading, isError } = useIssueAggregate();
  const issueCount = statusStats?.reduce(
    (accu, stats) => accu + stats.count,
    0
  );
  if (paymentLoading || isLoading) return <Loading />;
  if (paymentError || isError) return <ErrorComponent />;
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

      <div className="space-y-6 bg-white p-6 rounded-3xl flex gap-3 lg:flex-col md:flex-row flex-col">
        {/* Latest Issues */}

        {/* Latest Payments */}
      </div>
    </div>
  );
};

export default CitizenDashboard;
