import { lazy, Suspense, useEffect } from "react";
// import GeneratePdf from "../../../components/dashboard/invoice/GeneratePdf";
import ErrorComponent from "../../../components/error/error page/ErrorComponent";
import Loading from "../../../components/loading/Loading";
import useGetAllPayments from "../../../hooks/payment related/useGetAllPayments";
import usePayment from "../../../hooks/payment related/usePayment";

const GeneratePdf = lazy(() => import("../../../components/dashboard/invoice/GeneratePdf"))

const InvoicePaymentHistory = () => {
  const { paymentsPDF, setPaymentsPDF } = usePayment();
  const { payments, isLoading, isError } = useGetAllPayments();
  useEffect(() => {
    if (payments.length) {
      setPaymentsPDF(payments);
    }
  }, [payments, setPaymentsPDF]);
  if (isLoading) return <Loading />;
  if (isError) return <ErrorComponent />;
  return <Suspense fallback={<Loading />}><GeneratePdf paymentsPDF={paymentsPDF} /></Suspense>;
};

export default InvoicePaymentHistory;
