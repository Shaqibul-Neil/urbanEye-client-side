import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const axiosSecure = axios.create({
  baseURL: `https://urbaneye-server-side.vercel.app`,
  //baseURL: `http://localhost:5000`,
});

const useAxiosSecure = () => {
  const { user, signOutUser, setUser } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const requestInterceptors = axiosSecure.interceptors.request.use(
      (config) => {
        const token = user?.accessToken;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    const responseInterceptors = axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        const statusCode = error.response?.status;
        if (statusCode === 401 || statusCode === 403) {
          signOutUser().then(() => {
            setUser(null);
            navigate("/signin");
            toast.success("Successfully Logged Out");
          });
        }
        return Promise.reject(error);
      }
    );
    // Cleanup interceptor
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptors);
      axiosSecure.interceptors.response.eject(responseInterceptors);
    };
  }, [user, navigate, signOutUser, setUser]);
  return axiosSecure;
};

export default useAxiosSecure;
