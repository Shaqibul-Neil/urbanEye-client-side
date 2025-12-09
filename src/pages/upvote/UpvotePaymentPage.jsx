// PaymentPage.jsx
import { useState } from "react";
import { CreditCard, Smartphone } from "lucide-react";
import { useLocation } from "react-router";

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
  const location = useLocation();
  const issue = location.state?.issue;
  const [selected, setSelected] = useState("card");

  const handleUpvotePay = async () => {
    if (!selected) return;
    onPay && onPay(selected);
    try {
      console.log("upvote", issue);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-start p-6">
      <div className="max-w-lg w-full mx-auto space-y-8">
        {/* Heading */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold text-secondary">
            Complete Your Payment
          </h1>
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
            onClick={handleUpvotePay}
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
