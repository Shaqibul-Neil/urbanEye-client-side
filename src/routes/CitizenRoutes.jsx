import useAuth from "../hooks/auth & role/useAuth";
import useRole from "../hooks/auth & role/useRole";
import Forbidden from "../components/error/forbidden/Forbidden";

const CitizenRoutes = ({ children }) => {
  const { userLoading } = useAuth();
  const { role, roleLoading } = useRole();

  if (userLoading || roleLoading) return <p>Loading....</p>;
  if (role !== "citizen") return <Forbidden />;
  return <div>{children}</div>;
};

export default CitizenRoutes;
