import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../auth & role/useAxiosSecure";

const useStaffAssign = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (assignedIssue) => {
      const { data } = await axiosSecure.patch(
        `/issues/${assignedIssue._id}/assign/admin`,
        assignedIssue
      );
      return data;
    },
    onSuccess: () => {
      //query key invalidate
      queryClient.invalidateQueries(["all-staffs", "available"]);
      queryClient.invalidateQueries(["my-issues"]);
      queryClient.invalidateQueries(["latest-issue"]); // For admin dashboard
      queryClient.invalidateQueries(["all-issues"]); // For all reported issues page
    },
  });
  return mutation;
};

export default useStaffAssign;
