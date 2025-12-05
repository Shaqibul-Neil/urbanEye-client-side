import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../auth & role/useAxiosSecure";

const useReportIssues = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (issuesData) => {
      const { data } = await axiosSecure.post("/issues", issuesData);
      return data;
    },
    onSuccess: () => {
      //query key invalidate
      queryClient.invalidateQueries(["my-issues", "my-info"]);
      mutation.reset();
    },
  });
  return mutation;
};

export default useReportIssues;
