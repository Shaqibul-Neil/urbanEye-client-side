import { Navigate } from "react-router";
import useAuth from "../hooks/auth & role/useAuth";

const AdminRoutes = ({ children }) => {
  const { user, userLoading } = useAuth();

  if (userLoading) return <p>Loading....</p>;
  if (!user) return <Navigate></Navigate>;
  return <div>{children}</div>;
};

export default AdminRoutes;
