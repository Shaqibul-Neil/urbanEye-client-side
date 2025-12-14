import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../auth & role/useAxiosSecure";

const useIssueDetails = (id) => {
  const axiosSecure = useAxiosSecure();

  const {
    data: issue = {},
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["issue", id],
    queryFn: async ({ queryKey }) => {
      const [_key, issueId] = queryKey; // extract id from queryKey for actual string id
      const res = await axiosSecure.get(`/issues/${issueId}`);
      return res?.data?.issue;
    },
  });
  return { issue, isLoading, isError, refetch };
};

export default useIssueDetails;

/*
queryFn: async (id) => {
  const res = await axiosSecure.get(`/issues/${id}`);
  return res?.data?.issue;
},
Here, id is not a string, it’s actually an object. That’s why in the backend console we see [object Object] instead of the real id.
React Query wants queryFn like this:
queryFn: async ({ queryKey }) => {
  const [_key, issueId] = queryKey; // get the real id from queryKey
  const res = await axiosSecure.get(`/issues/${issueId}`);
  return res?.data?.issue;
}
So basically:
Frontend must send string id, not object.
Backend can stay exactly the same.
 */
