import { formatDate } from "../../../utilities/formatDate";
import Heading from "../../../components/common/heading/Heading";
import SubHeading from "../../../components/common/heading/SubHeading";
import Loading from "../../../components/loading/Loading";
import ErrorComponent from "../../../components/error/error page/ErrorComponent";
import useGetAllPayments from "../../../hooks/payment related/useGetAllPayments";
import { motion } from "framer-motion";

const MyPayments = () => {
  const { payments, isLoading, isError } = useGetAllPayments();

  if (isLoading) return <Loading />;
  if (isError) return <ErrorComponent />;
  return (
    <div className="p-5 bg-white mx-5 rounded-3xl">
      <div className="space-y-12">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="flex items-center gap-4"
        >
          <div className="w-1 h-8 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <div className="space-y-2">
            <Heading
              label={"My Payment History"}
              className={"md:text-4xl text-3xl pb-1"}
            />
            <SubHeading
              label={
                "Track all your subscription payments. Each payment shows the transaction ID and payment date."
              }
            />
          </div>
        </motion.div>

        {/* Table Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="overflow-x-auto rounded-lg shadow-lg border border-gray-200 lg:mx-5"
        >
          <table className="table table-zebra w-full min-w-[800px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 border-b-2 border-blue-600/20">No</th>
                <th className="py-3 px-4 border-b-2 border-blue-600/20">
                  Payment Name
                </th>
                <th className="py-3 px-4 border-b-2 border-blue-600/20">
                  Payment Time
                </th>
                <th className="py-3 px-4 border-b-2 border-blue-600/20">
                  Transaction Id
                </th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, i) => (
                <tr
                  key={payment._id}
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
                  <td className="py-3 px-4 text-gray-700 font-semibold">
                    {payment?.paymentName}
                  </td>
                  <td className="py-3 px-4 font-semibold text-gray-700">
                    {formatDate(payment?.paidAt)}
                  </td>
                  <td className="py-3 px-4 font-semibold text-gray-700">
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

export default MyPayments;
