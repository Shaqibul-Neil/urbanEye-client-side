import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/auth & role/useAuth";
import useAxiosSecure from "../../../hooks/auth & role/useAxiosSecure";
import Heading from "../../../components/common/heading/Heading";
import SubHeading from "../../../components/common/heading/SubHeading";

const PaymentsHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    data: payments = [],
    refetch,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["payments", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/payments");
      return res?.data?.payment;
    },
  });
  return (
    <div className="lg:px-5 md:px-3 px-1 py-6">
      <div className="space-y-12">
        {/* Title Section */}
        <div className="flex justify-between items-center gap-10 md:flex-row flex-col">
          <div className="space-y-2">
            <Heading label={"Payments History"} />
            <SubHeading
              label={
                "Track all user payments, view details, and manage transactions—all from one centralized dashboard."
              }
            />
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
                    payment.status !== "completed"
                      ? "bg-[#FFF7F0] hover:bg-orange-100"
                      : ""
                  }`}
                >
                  <th className="py-3 px-4 border-l-4 border-l-[#6EE7B7]">
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
