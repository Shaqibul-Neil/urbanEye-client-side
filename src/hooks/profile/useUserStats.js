import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../auth & role/useAxiosSecure";

const useUserStats = (email) => {
  const axiosSecure = useAxiosSecure();

  const {
    data: userStats,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["userStats", email],
    queryFn: async () => {
      const response = await axiosSecure.get(`/users/${email}/stats`);
      return response.data.stats;
    },
    enabled: !!email,
  });

  return { userStats, isLoading, isError, error };
};

export default useUserStats;