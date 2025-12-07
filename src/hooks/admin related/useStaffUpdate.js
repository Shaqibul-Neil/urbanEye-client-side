import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../auth & role/useAxiosSecure";

const useStaffUpdate = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (updatedStuff) => {
      const { data } = await axiosSecure.patch(
        `/staff/${updatedStuff.staffId}/admin`,
        updatedStuff
      );
      return data;
    },
    onSuccess: () => {
      //query key invalidate
      queryClient.invalidateQueries(["all-staffs"]);
    },
  });
  return mutation;
};

export default useStaffUpdate;
