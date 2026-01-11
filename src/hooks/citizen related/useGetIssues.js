import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../auth & role/useAxiosSecure";
import useAuth from "../auth & role/useAuth";

const useGetIssues = (searchText = "", page = 0, limit = 5, status = "all", sortBy = "date-desc") => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const skip = page * limit;

  const {
    data: response = {},
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["my-issues", user?.email, searchText, page, limit, status, sortBy],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/issues?searchText=${searchText}&limit=${limit}&skip=${skip}&status=${status}&sortBy=${sortBy}`
      );
      return res?.data;
    },
    //stop flickering the table
    keepPreviousData: true,
  });

  return { 
    issues: response?.issue || [], 
    pagination: response?.pagination || {},
    isLoading, 
    isError,
    refetch
  };
};

export default useGetIssues;
