import { useContext } from "react";
import PaymentContext from "../../context/PaymentContext";

const usePayment = () => {
  const paymentPdfInfo = useContext(PaymentContext);
  return paymentPdfInfo;
};
export default usePayment;
