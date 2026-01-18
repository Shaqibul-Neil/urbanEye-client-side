import Heading from "../../../components/common/heading/Heading";
import SubHeading from "../../../components/common/heading/SubHeading";
import Loading from "../../../components/loading/Loading";
import ErrorComponent from "../../../components/error/error page/ErrorComponent";
import { useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import useGetAllPayments from "../../../hooks/payment related/useGetAllPayments";
import { ChevronDown, Download } from "lucide-react";

const PaymentsHistory = () => {
  const [filterType, setFilterType] = useState("");

  const { payments, isLoading, isError } = useGetAllPayments({ filterType });

  if (isLoading) return <Loading />;
  if (isError) return <ErrorComponent />;
  return (
    <div className="lg:px-5 px-3 py-6 bg-white mx-5 rounded-3xl">
      <div className="space-y-8">
        {/* Title Section */}

        <div className="flex justify-between items-center w-full gap-4 flex-col md:flex-row">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="flex items-center gap-4 mb-4"
          >
            <div className="w-1 h-8 bg-gradient-to-b from-primary to-accent rounded-full"></div>
            <div className="space-y-2">
              <Heading
                label={"Payments History"}
                className={"text-3xl md:text-4xl pb-1"}
              />
              <SubHeading
                label={
                  "Track all user payments from one centralized dashboard."
                }
              />
            </div>
          </motion.div>
          <div className="flex justify-between items-center gap-4 md:flex-row flex-col">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="relative"
            >
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full py-3 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none appearance-none cursor-pointer"
              >
                <option value="">All Types</option>
                <option value="subscription">Subscription</option>
                <option value="upvote">Upvote</option>
              </select>
              <ChevronDown
                size={20}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
            </motion.div>{" "}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Link
                to={"/dashboard/invoice-payment-history"}
                className="cursor-pointer btn-primary w-8 h-8 flex justify-center items-center rounded-full"
              >
                <Download className="w-6 h-6 text-primary" />{" "}
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Table Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="overflow-x-auto rounded-lg shadow-lg border border-gray-200 lg:mx-5"
        >
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
                  className={`transition-all duration-300 hover:shadow-md ${
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
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentsHistory;
