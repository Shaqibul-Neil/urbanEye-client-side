import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../auth & role/useAxiosSecure";

const useStaffDelete = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.delete(`/staff/${id}/admin`);
      return data;
    },
    onSuccess: () => {
      //query key invalidate
      queryClient.invalidateQueries(["all-staffs"]);
    },
  });
  return mutation;
};

export default useStaffDelete;
