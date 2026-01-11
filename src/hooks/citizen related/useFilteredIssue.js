import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../auth & role/useAxiosSecure";
import useAuth from "../auth & role/useAuth";

const useFilteredIssues = (searchText = "", page = 0, limit = 5, filters = {}, sortBy = "date-desc") => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const skip = page * limit;

  const statusQuery = filters.status?.length ? filters.status.join(",") : "all";
  const priorityQuery = filters.priority?.length ? filters.priority.join(",") : "all";

  const {
    data: response = {},
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["my-issues", user?.email, searchText, page, limit, filters, sortBy],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/issues/my-issues?searchText=${searchText}&limit=${limit}&skip=${skip}&status=${statusQuery}&priority=${priorityQuery}&sortBy=${sortBy}`
      );
      return res?.data;
    },
    keepPreviousData: true,
  });

  return { 
    issues: response?.issue || [], 
    pagination: response?.pagination || {},
    isLoading, 
    isError,
    refetch
  };
};

export default useFilteredIssues;
