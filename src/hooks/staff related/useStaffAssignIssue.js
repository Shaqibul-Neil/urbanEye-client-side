import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../auth & role/useAxiosSecure";
import useAuth from "../auth & role/useAuth";

const useStaffAssignIssue = (searchText = "", page = 0, limit = 5, filters = {}, sortBy = "date-desc") => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { status = "" } = filters;
  const skip = page * limit;

  const {
    data: response = {},
    isLoading: issuesLoading,
    isError: issuesError,
    refetch: refetchAssignIssues,
  } = useQuery({
    queryKey: ["issues", user?.email, searchText, page, limit, status, sortBy],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/issues/staff/assigned-issues?staffEmail=${user?.email}&status=${status}&searchText=${searchText}&limit=${limit}&skip=${skip}&sortBy=${sortBy}`
      );
      return data;
    },
    keepPreviousData: true,
  });

  return { 
    assignedIssues: response?.issues || [], 
    pagination: response?.pagination || {},
    issuesLoading, 
    issuesError, 
    refetchAssignIssues 
  };
};

export default useStaffAssignIssue;
