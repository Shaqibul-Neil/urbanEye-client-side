import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/auth & role/useAxiosSecure";

const ManageCitizens = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [] } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const res = axiosSecure.get("/users");
      console.log(res);
      return res;
    },
  });
  return <div></div>;
};

export default ManageCitizens;
