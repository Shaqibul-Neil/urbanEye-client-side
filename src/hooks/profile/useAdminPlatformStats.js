import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../auth & role/useAxiosSecure";

const useAdminPlatformStats = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: platformStats,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["adminPlatformStats"],
    queryFn: async () => {
      const response = await axiosSecure.get("/issues/admin/platform-stats");
      // console.log(response);
      return response.data.stats;
    },
    retry: 3,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return { platformStats, isLoading, isError, error };
};

export default useAdminPlatformStats;
