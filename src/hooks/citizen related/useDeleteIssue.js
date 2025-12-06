import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../auth & role/useAxiosSecure";

const useDeleteIssue = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.delete(`/issues/${id}`);
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

export default useDeleteIssue;
