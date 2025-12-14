import React from "react";
import useAxiosSecure from "../auth & role/useAxiosSecure";
import useAuth from "../auth & role/useAuth";
import { useQuery } from "@tanstack/react-query";

const useGetAllPayments = ({ filterType } = {}) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    data: payments = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["payments", user?.email, filterType],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/payments", {
        params: {
          ...(filterType && { paymentType: filterType }),
        },
      });
      return res?.data?.payment;
    },
  });
  return { payments, isLoading, isError };
};

export default useGetAllPayments;
