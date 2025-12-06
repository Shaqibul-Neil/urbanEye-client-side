import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../auth & role/useAxiosSecure";
import useAuth from "../auth & role/useAuth";

const useGetIssues = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    data: issues = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["my-issues", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/issues/${user?.email}`);
      return res.data.issue;
    },
  });
  return { issues, isLoading, isError };
};

export default useGetIssues;
