import useAuth from "../hooks/auth & role/useAuth";
import useRole from "../hooks/auth & role/useRole";
import Forbidden from "../components/error/forbidden/Forbidden";
import Loading from "../components/loading/Loading";

const CitizenRoutes = ({ children }) => {
  const { userLoading } = useAuth();
  const { role, roleLoading } = useRole();

  if (userLoading || roleLoading) return <Loading />;
  if (role !== "citizen") return <Forbidden />;
  return <div>{children}</div>;
};

export default CitizenRoutes;
