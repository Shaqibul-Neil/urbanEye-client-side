import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../auth & role/useAxiosSecure";

const useIssueReject = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (updatedIssue) => {
      const { data } = await axiosSecure.patch(
        `/issues/${updatedIssue.issueId}/reject/admin`,
        updatedIssue
      );
      return data;
    },
    onSuccess: () => {
      //query key invalidate
      queryClient.invalidateQueries(["my-issues"]);
    },
  });
  return mutation;
};

export default useIssueReject;
