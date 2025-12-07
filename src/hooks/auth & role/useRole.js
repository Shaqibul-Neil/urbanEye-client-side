import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: role = "citizen",
    isLoading: roleLoading,
    isError: roleError,
    refetch: refetchRole,
  } = useQuery({
    queryKey: ["user-role", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users/${user.email}/role`);
      return data?.role || "citizen";
    },
  });
  return { role, roleLoading, roleError, refetchRole };
};

export default useRole;
