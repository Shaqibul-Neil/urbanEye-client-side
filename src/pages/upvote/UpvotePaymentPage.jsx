import { useState } from "react";
import { CreditCard, Smartphone } from "lucide-react";
import useIssueDetails from "../../hooks/citizen related/useIssueDetails";
import { useParams } from "react-router";
import Loading from "../../components/loading/Loading";
import ErrorPage from "../../components/error/error page/ErrorPage";
import useAuth from "../../hooks/auth & role/useAuth";
import useAxiosSecure from "../../hooks/auth & role/useAxiosSecure";

const paymentMethods = [
  {
    id: "card",
    name: "Card / Stripe",
    subtitle: "Pay with Credit or Debit Card (via Stripe)",
    icon: <CreditCard className="w-12 h-12 text-primary" />,
  },
  {
    id: "mobile",
    name: "Mobile Financial Service",
    subtitle: "Pay with Mobile Wallet / bKash / Rocket etc.",
    icon: <Smartphone className="w-12 h-12 text-success" />,
  },
];

const UpvotePaymentPage = ({ totalAmount = 100, onPay }) => {
  const { id } = useParams();
  const { user } = useAuth();
  const [selected, setSelected] = useState("card");
  const axiosSecure = useAxiosSecure();
  const { issue, isLoading, isError } = useIssueDetails(id);

  const handleUpvotePay = async (issue) => {
    if (!selected) return;
    onPay && onPay(selected);
    try {
      const paymentInfo = {
        paymentName: issue?.title,
        citizenEmail: user?.email, //one who pays
        issueId: issue?._id,
      };
      console.log(paymentInfo);
      const result = await axiosSecure.post(
        "/payments/upvote-checkout-session",
        paymentInfo
      );
      console.log(result);
      //redirect to checkout page
      window.location.assign(result?.data?.url);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(issue);
  if (isLoading) return <Loading />;
  if (isError) return <ErrorPage />;

  return (
    <div className="min-h-screen bg-gray-50 flex items-start px-6 py-16">
      <div className="max-w-lg w-full mx-auto space-y-8">
        {/* Heading */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-extrabold text-secondary">
            Complete Your Payment
          </h1>
          <h2 className="md:text-xl font-semibold text-primary">
            Upvote Issue : {issue?.title}
          </h2>
          <p className="text-gray-600">
            Choose a payment method below and proceed to pay. Your selected
            method will be used to process your transaction.
          </p>
        </div>

        {/* Payment method cards */}
        <div className="space-y-4">
          {paymentMethods.map((m) => {
            const isSelected = selected === m.id;
            return (
              <div
                key={m.id}
                className={`relative flex items-center p-5 rounded-2xl border transition-all duration-300 cursor-pointer bg-white
                  ${
                    isSelected
                      ? "border-primary shadow-2xl scale-105"
                      : "border-gray-200 hover:shadow-lg"
                  }`}
                onClick={() => setSelected(m.id)}
              >
                <div className="mr-4">{m.icon}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {m.name}
                  </h3>
                  <p className="text-gray-500 text-sm">{m.subtitle}</p>
                </div>
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={isSelected}
                  readOnly
                  className="absolute top-4 right-4 w-4 h-4 text-primary border-gray-300"
                />
              </div>
            );
          })}
        </div>

        {/* Summary and Pay button */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-medium text-gray-700">
              Total Amount:
            </span>
            <span className="text-2xl font-extrabold text-gray-900">
              $ {totalAmount}
            </span>
          </div>
          <button
            onClick={() => handleUpvotePay(issue)}
            className="w-full py-4 bg-primary hover:bg-indigo-700 text-white font-semibold rounded-2xl transition-colors duration-200 shadow-lg"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpvotePaymentPage;
