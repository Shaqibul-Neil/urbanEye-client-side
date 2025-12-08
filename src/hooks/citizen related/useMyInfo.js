import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../auth & role/useAxiosSecure";
import useAuth from "../auth & role/useAuth";

const useMyInfo = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    data: myInfo = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["my-info", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res?.data?.user;
    },
  });
  return { myInfo, isLoading, isError };
};

export default useMyInfo;
