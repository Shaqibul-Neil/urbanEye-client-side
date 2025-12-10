import AdminPaymentChart from "../../../components/dashboard/payment chart/AdminPaymentChart";
import ErrorPage from "../../../components/error/error page/ErrorPage";
import Loading from "../../../components/loading/Loading";
import useAggregatePayment from "../../../hooks/payment related/useAggregatePayment";

const CitizenDashboard = () => {
  //total payments data aggregation
  const { paymentStats, paymentLoading, paymentError } = useAggregatePayment();
  if (paymentLoading) return <Loading />;
  if (paymentError) return <ErrorPage />;
  return (
    <div className="grid lg:grid-cols-4 gap-8">
      {/* Left Side Stats */}
      <div className="lg:col-span-3 space-y-8">
        {/* Issue Status Cards */}

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
