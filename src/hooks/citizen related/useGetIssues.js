import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../auth & role/useAxiosSecure";
import useAuth from "../auth & role/useAuth";

const useGetIssues = (searchText = "") => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    data: issues = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["my-issues", user?.email, searchText],
    queryFn: async () => {
      const res = await axiosSecure.get(`/issues?searchText=${searchText}`);
      return res?.data?.issue;
    },
    //stop flickering the table
    keepPreviousData: true,
  });
  return { issues, isLoading, isError };
};

export default useGetIssues;
