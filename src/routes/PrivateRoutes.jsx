import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/auth & role/useAuth";

const PrivateRoutes = ({ children }) => {
  const { user, userLoading } = useAuth();
  const location = useLocation();
  if (userLoading) return <p>Loading....</p>;
  if (!user)
    return <Navigate state={location.pathname} to={"/signin"}></Navigate>;
  return <div>{children}</div>;
};

export default PrivateRoutes;
