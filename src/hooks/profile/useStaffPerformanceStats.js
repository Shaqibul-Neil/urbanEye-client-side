import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../auth & role/useAxiosSecure";

const useStaffPerformanceStats = (email) => {
  const axiosSecure = useAxiosSecure();

  const {
    data: performanceStats,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["staffPerformanceStats", email],
    queryFn: async () => {
      const response = await axiosSecure.get(`/issues/staff/${email}/performance-stats`);
      return response.data.stats;
    },
    enabled: !!email,
  });

  return { performanceStats, isLoading, isError, error };
};

export default useStaffPerformanceStats;