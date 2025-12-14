import { useState } from "react";
import PaymentContext from "./PaymentContext";

const PaymentProvider = ({ children }) => {
  const [paymentsPDF, setPaymentsPDF] = useState([]);
  const paymentPdfInfo = { paymentsPDF, setPaymentsPDF };
  return (
    <PaymentContext.Provider value={paymentPdfInfo}>
      {children}
    </PaymentContext.Provider>
  );
};

export default PaymentProvider;
