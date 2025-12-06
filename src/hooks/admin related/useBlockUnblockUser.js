import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../auth & role/useAxiosSecure";

const useBlockUnblockUser = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (userInfo) => {
      const { data } = await axiosSecure.patch(
        `/users/${userInfo.id}/status`,
        userInfo
      );
      return data;
    },
    onSuccess: () => {
      //query key invalidate
      queryClient.invalidateQueries(["all-users", "my-issues"]);
      mutation.reset();
    },
  });
  return mutation;
};

export default useBlockUnblockUser;
