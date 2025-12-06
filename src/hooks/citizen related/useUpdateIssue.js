import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../auth & role/useAxiosSecure";

const useUpdateIssue = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (updatedIssue) => {
      const { data } = await axiosSecure.patch(
        `/issues/${updatedIssue.issueId}`,
        updatedIssue
      );
      return data;
    },
    onSuccess: () => {
      //query key invalidate
      queryClient.invalidateQueries(["my-issues"]);
      mutation.reset();
    },
  });
  return mutation;
};

export default useUpdateIssue;
