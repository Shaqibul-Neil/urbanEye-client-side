import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../auth & role/useAxiosSecure";

const useIssueAggregate = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: statusStats = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["status-stats"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/issues/admin/stats/status");
      return data?.result;
    },
  });
  return { statusStats, isLoading, isError };
};

export default useIssueAggregate;
