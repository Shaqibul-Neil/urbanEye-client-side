import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../auth & role/useAxiosSecure";

const useAggregatePayment = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: paymentStats = [],
    isLoading: paymentLoading,
    isError: paymentError,
  } = useQuery({
    queryKey: ["payment-stats"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/payments/stats/total");
      return data;
    },
  });
  return { paymentStats, paymentLoading, paymentError };
};

export default useAggregatePayment;
