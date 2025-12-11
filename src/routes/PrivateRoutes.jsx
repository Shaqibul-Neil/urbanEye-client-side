import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/auth & role/useAuth";
import Loading from "../components/loading/Loading";

const PrivateRoutes = ({ children }) => {
  const { user, userLoading } = useAuth();
  const location = useLocation();
  if (userLoading) return <Loading />;
  if (!user)
    return <Navigate state={location.pathname} to={"/signin"}></Navigate>;
  return <div>{children}</div>;
};

export default PrivateRoutes;
