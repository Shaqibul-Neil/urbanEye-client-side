import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../hooks/auth & role/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState("");
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    try {
      if (sessionId) {
        axiosSecure
          .patch(`/payments/payment-success?session_id=${sessionId}`, sessionId)
          .then((res) => {
            console.log(res);
            setPaymentInfo(res?.data?.transactionId);
          });
      }
    } catch (error) {
      console.log(error);
    }
  }, [sessionId, axiosSecure]);
  return (
    <div>
      <p>Transaction Id: {paymentInfo}</p>
    </div>
  );
};

export default PaymentSuccess;
