import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/auth & role/useAxiosSecure";
import useAuth from "../../../hooks/auth & role/useAuth";
import { formatDate } from "../../../utilities/formatDate";
import Heading from "../../../components/common/heading/Heading";
import SubHeading from "../../../components/common/heading/SubHeading";

const MyPayments = () => {
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
      const res = await axiosSecure.get(`/payments/${user?.email}`);
      return res?.data?.payment;
    },
  });
  return (
    <div className="px-5">
      <div className="space-y-12">
        {/* Title Section */}
        <div className="space-y-2">
          <Heading label={"My Payment History"} />
          <SubHeading
            label={
              "Track all your subscription payments. Each payment shows the transaction ID and payment date."
            }
          />
        </div>
        {/* Table Section */}
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>No</th>
                <th>Payment Name</th>
                <th>Payment Time</th>
                <th>Transaction Id</th>
                <th>Tracking Id</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, i) => (
                <tr key={payment._id}>
                  <th>{i + 1}</th>
                  <td>{payment.paymentName}</td>
                  <td>{formatDate(payment.paidAt)}</td>
                  <td>{payment.transactionId}</td>
                  <td>{payment.trackingId || "N/A"}</td>
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
