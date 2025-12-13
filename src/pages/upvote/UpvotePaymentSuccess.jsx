import { CheckCircle2, Download, Home, Compass } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import useAxiosSecure from "../../hooks/auth & role/useAxiosSecure";
import toast from "react-hot-toast";
import Loading from "../../components/loading/Loading";

const UpvotePaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [paymentInfo, setPaymentInfo] = useState("");
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    if (!sessionId) return;
    setLoading(true);
    axiosSecure
      .post(
        `/payments/upvote-payment-success?session_id=${sessionId}`,
        sessionId
      )
      .then((res) => {
        setPaymentInfo(res?.data?.payment);
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [sessionId, axiosSecure]);

  //console.log(paymentInfo);
  if (loading) return <Loading />;
  //   if (!paymentInfo) {
  //     return (
  //       <div className="text-center mt-20 text-red-500">
  //         Payment data not found
  //       </div>
  //     );
  //   }
  const receipt = {
    service: paymentInfo?.paymentName,
    amount: paymentInfo?.amount,
    currency: paymentInfo?.currency,
    paidBy: paymentInfo?.citizenEmail,
    transactionId: paymentInfo?.transactionId,
    date: new Date(paymentInfo?.paidAt).toLocaleString(),
    method: paymentInfo?.paymentMethod || "Card / Stripe",
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-emerald-50 flex items-center justify-center px-4 py-12">
      <div className="relative max-w-3xl w-full">
        {/* floating glow */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-indigo-400/20 blur-3xl rounded-full animate-pulse" />
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-emerald-400/20 blur-3xl rounded-full animate-pulse" />

        {/* main card */}
        <div className="relative">
          {/* top bar */}
          <div className="flex justify-between items-center px-6 py-4 border-b">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="text-emerald-500 w-6 h-6 animate-bounce" />
              <span className="font-semibold text-secondary text-lg">
                Payment Successful
              </span>
            </div>

            <button className="flex items-center gap-2 text-sm font-medium text-primary hover:underline">
              <Download className="w-4 h-4" />
              Download Receipt
            </button>
          </div>

          {/* content */}
          <div className="p-8 space-y-6">
            {/* headline */}
            <div className="text-center space-y-2">
              <h1 className="text-4xl font-extrabold text-secondary tracking-tight">
                Thank you for your support
              </h1>
              <p className="text-gray-600">
                Your payment has been processed successfully.
              </p>
            </div>

            {/* receipt */}
            <div className="bg-linear-to-br from-gray-50 to-white border rounded-2xl p-6 shadow-inner space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Payment For</span>
                <span className="font-semibold">{receipt?.service}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Payment Method</span>
                <span className="font-semibold">{receipt?.method}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Paid By</span>
                <span className="font-semibold">{receipt?.paidBy}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Transaction ID</span>
                <span className="font-semibold">{receipt?.transactionId}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Date</span>
                <span className="font-semibold">{receipt?.date}</span>
              </div>

              <div className="border-t pt-4 flex justify-between items-center">
                <span className="text-lg font-semibold text-secondary">
                  Total Paid
                </span>
                <span className="text-3xl font-extrabold text-primary">
                  ${receipt?.amount}
                </span>
              </div>
            </div>

            {/* actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                to={"/"}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary text-white font-semibold shadow-lg hover:scale-105 transition"
              >
                <Home className="w-4 h-4" />
                Back to Home
              </Link>

              <Link
                to={"/all-issues"}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl border border-primary text-primary font-semibold hover:bg-primary hover:text-white transition"
              >
                <Compass className="w-4 h-4" />
                Explore More Issues
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpvotePaymentSuccess;
