import React from "react";
import useAxiosSecure from "../auth & role/useAxiosSecure";
import useAuth from "../auth & role/useAuth";
import { useQuery } from "@tanstack/react-query";
import useRole from "../auth & role/useRole";

const useLatestPayments = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { role } = useRole();
  const {
    data: latestPayments = [],
    isLoading: latestLoading,
    isError: latestError,
  } = useQuery({
    queryKey: ["payments", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/payments?limit=${role === "admin" ? 2 : 3}`
      );
      return res?.data?.payment;
    },
  });
  return { latestPayments, latestLoading, latestError };
};

export default useLatestPayments;
