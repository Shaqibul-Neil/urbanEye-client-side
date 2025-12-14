import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/auth & role/useAuth";
import useAxiosSecure from "../../../hooks/auth & role/useAxiosSecure";
import Heading from "../../../components/common/heading/Heading";
import SubHeading from "../../../components/common/heading/SubHeading";
import Loading from "../../../components/loading/Loading";
import ErrorComponent from "../../../components/error/error page/ErrorComponent";
import { useState } from "react";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router";
import usePayment from "../../../hooks/payment related/usePayment";

const PaymentsHistory = () => {
  const [filterType, setFilterType] = useState("");
  const { paymentsPDF, setPaymentsPDF } = usePayment();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    data: payments = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["payments", user?.email, filterType],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/payments", {
        params: {
          ...(filterType && { paymentType: filterType }),
        },
      });
      console.log(res.data);
      return res?.data?.payment;
    },
    onSuccess: (data) => {
      console.log("Payments fetched: ", data);
      setPaymentsPDF(data);
    },
  });
  if (isLoading) return <Loading />;
  if (isError) return <ErrorComponent />;
  console.log("paymentsPDF", paymentsPDF);
  return (
    <div className="lg:px-5 md:px-3 px-1 py-6">
      <div className="space-y-12">
        {/* Title Section */}
        <div className="flex justify-between items-center gap-10 md:flex-row flex-col">
          <div className="space-y-2">
            <Heading
              label={"Payments History"}
              className={"text-4xl md:text-5xl pb-1"}
            />
            <SubHeading
              label={
                "Track all user payments, view details, and manage transactions—all from one centralized dashboard."
              }
            />
          </div>
        </div>
        <div className="flex gap-4 items-center w-84 md:ml-auto md:flex-row flex-col">
          <button
            onClick={() => setShowPdf(true)}
            className="cursor-pointer btn btn-outline btn-primary"
          >
            Download PDF
          </button>

          <div className="w-48">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="select select-bordered w-48 py-2 px-3 bg-base-200 border border-primary rounded-xl focus:ring-1 focus:ring-primary outline-none"
            >
              <option value="">All Types</option>
              <option value="subscription">Subscription</option>
              <option value="upvote">Upvote</option>
            </select>
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200">
          <table className="table table-zebra w-full min-w-[800px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 border-b-2 border-blue-600/20">No</th>
                <th className="py-3 px-4 border-b-2 border-blue-600/20 sticky left-0 z-10">
                  Citizen Email
                </th>
                <th className="py-3 px-4 border-b-2 border-blue-600/20">
                  Payment Type
                </th>
                <th className="py-3 px-4 border-b-2 border-blue-600/20">
                  Amount
                </th>
                <th className="py-3 px-4 border-b-2 border-blue-600/20">
                  Date
                </th>
                <th className="py-3 px-4 border-b-2 border-blue-600/20">
                  Transaction Id
                </th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, i) => (
                <tr
                  key={payment?._id}
                  className={`transition-all duration-300 hover:scale-[1.01] hover:shadow-md ${
                    payment.paymentType !== "subscription"
                      ? "bg-[#FFF7F0] hover:bg-orange-100"
                      : "bg-green-50 hover:bg-green-100"
                  }`}
                >
                  <th
                    className={`py-3 px-4 border-l-4 ${
                      payment.paymentType !== "subscription"
                        ? "border-l-yellow-400"
                        : "border-l-[#6EE7B7]"
                    }`}
                  >
                    {i + 1}
                  </th>
                  <td className="py-3 px-4 sticky left-0 z-10 text-gray-700 font-semibold">
                    <div className="">{payment?.citizenEmail}</div>
                  </td>
                  <td className="py-3 px-4 font-semibold text-gray-700">
                    {payment?.paymentName}
                  </td>
                  <td className="py-3 px-4 font-semibold text-gray-700">
                    ${payment?.amount}
                  </td>

                  <td className="py-3 px-4 text-gray-600">
                    {new Date(payment?.paidAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {payment?.transactionId}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentsHistory;
