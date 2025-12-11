import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../auth & role/useAxiosSecure";

const useIssueStatusChange = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (assignedIssue) => {
      const { data } = await axiosSecure.patch(
        `/issues/${assignedIssue.issueId}/staff/change-status`,
        assignedIssue
      );
      return data;
    },
    onSuccess: () => {
      //query key invalidate
      queryClient.invalidateQueries(["all-staffs", "available"]);
      queryClient.invalidateQueries(["my-issues"]);
      queryClient.invalidateQueries(["issues"]);
    },
  });
  return mutation;
};

export default useIssueStatusChange;
