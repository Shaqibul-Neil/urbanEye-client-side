import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../auth & role/useAxiosSecure";
import useAuth from "../auth & role/useAuth";

const useStaffAssignIssue = (filters = {}) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { status = "", priority = "" } = filters;
  const {
    data: assignedIssues = [],
    isLoading: issuesLoading,
    isError: issuesError,
    refetch: refetchAssignIssues,
  } = useQuery({
    queryKey: ["issues", user?.email, status, priority],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/issues/staff/assigned-issues?staffEmail=${user?.email}&status=${status}&priority=${priority}`
      );
      console.log(data);
      return data?.issues;
    },
  });
  return { assignedIssues, issuesLoading, issuesError, refetchAssignIssues };
};

export default useStaffAssignIssue;
