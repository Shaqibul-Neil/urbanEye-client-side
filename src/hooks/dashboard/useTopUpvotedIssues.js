import { useQuery } from "@tanstack/react-query";
import useAxios from "../auth & role/useAxios";

const useTopUpvotedIssues = (limit = 5) => {
  const axiosInstance = useAxios();

  const {
    data: topUpvotedIssues = [],
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ["top-upvoted-issues", limit],
    queryFn: async () => {
      // Use the public endpoint instead
      const { data } = await axiosInstance.get(`/issues/public/all-issues?limit=${limit}&status=resolved`);
      // Sort by upvotes and return top ones
      const sortedIssues = (data?.issue || [])
        .filter(issue => issue.totalUpvoteCount > 0)
        .sort((a, b) => (b.totalUpvoteCount || 0) - (a.totalUpvoteCount || 0))
        .slice(0, limit);
      return sortedIssues;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });

  return {
    topUpvotedIssues,
    isLoading,
    isError,
    error
  };
};

export default useTopUpvotedIssues;