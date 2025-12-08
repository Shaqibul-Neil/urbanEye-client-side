import ErrorPage from "../../../components/error/error page/ErrorPage";
import Loading from "../../../components/loading/Loading";
import useRole from "../../../hooks/auth & role/useRole";
import AdminDashboard from "./AdminDashboard";
import CitizenDashboard from "./CitizenDashboard";
import StaffDashBoard from "./StaffDashBoard";

const Dashboard = () => {
  const { role, roleLoading } = useRole();
  console.log(role);
  if (roleLoading) return <Loading />;
  if (role === "admin") return <AdminDashboard />;
  if (role === "citizen") return <CitizenDashboard />;
  if (role === "staff") return <StaffDashBoard />;
  return <ErrorPage />;
};

export default Dashboard;
