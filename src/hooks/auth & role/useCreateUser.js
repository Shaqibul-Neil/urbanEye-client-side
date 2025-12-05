import useAxios from "./useAxios";
import { useMutation } from "@tanstack/react-query";

const useCreateUser = () => {
  const axiosInstance = useAxios();
  return useMutation({
    mutationFn: async (userData) => {
      const { data } = await axiosInstance.post("/users", userData);
      return data;
    },
  });
};

export default useCreateUser;
