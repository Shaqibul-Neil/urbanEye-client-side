import { formatDate } from "../../../utilities/formatDate";
import Heading from "../../../components/common/heading/Heading";
import SubHeading from "../../../components/common/heading/SubHeading";
import Loading from "../../../components/loading/Loading";
import ErrorComponent from "../../../components/error/error page/ErrorComponent";
import useGetAllPayments from "../../../hooks/payment related/useGetAllPayments";

const MyPayments = () => {
  const { payments, isLoading, isError } = useGetAllPayments();

  if (isLoading) return <Loading />;
  if (isError) return <ErrorComponent />;
  return (
    <div className="lg:px-5 md:px-3 px-1 py-6">
      <div className="space-y-12">
        {/* Title Section */}
        <div className="space-y-2">
          <Heading
            label={"My Payment History"}
            className={"text-4xl md:text-5xl pb-1"}
          />
          <SubHeading
            label={
              "Track all your subscription payments. Each payment shows the transaction ID and payment date."
            }
          />
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200">
          <table className="table table-zebra w-full min-w-[800px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 border-b-2 border-blue-600/20">No</th>
                <th className="py-3 px-4 border-b-2 border-blue-600/20 sticky left-0 z-10">
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
                  <td className="py-3 px-4 sticky left-0 z-10 text-gray-700 font-semibold">
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
        </div>
      </div>
    </div>
  );
};

export default MyPayments;
