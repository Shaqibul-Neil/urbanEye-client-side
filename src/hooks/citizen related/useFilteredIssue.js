import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../auth & role/useAxiosSecure";
import useAuth from "../auth & role/useAuth";

const useFilteredIssues = (filters) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const statusQuery = filters.status.join(",");
  const priorityQuery = filters.priority.join(",");

  const {
    data: issues = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["my-issues", user?.email, filters],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/issues/my-issues?status=${statusQuery}&priority=${priorityQuery}`
      );
      return res?.data?.issue;
    },
    keepPreviousData: true,
  });

  return { issues, isLoading, isError };
};

export default useFilteredIssues;
