import { Link, Outlet, useNavigate } from "react-router";
import { MdLogout, MdOutlineDashboard } from "react-icons/md";
import SideBarLinks from "../components/common/sidebarLinks/SideBarLinks";
import useAuth from "../hooks/auth & role/useAuth";
import avatarImg from "../assets/placeholder.jpg";
import {
  Bell,
  CreditCard,
  Edit,
  Eye,
  Home,
  HomeIcon,
  ListChecks,
  Mail,
  Mic,
  User,
  User2Icon,
  UserCog,
  Users,
} from "lucide-react";
import toast from "react-hot-toast";
import useRole from "../hooks/auth & role/useRole";
import Loading from "../components/loading/Loading";

const DashboardLayout = () => {
  const { user, signOutUser, setUser } = useAuth();
  const { role, roleLoading } = useRole();
  const navigate = useNavigate();
  const handleLogout = () => {
    try {
      signOutUser();
      setUser(null);
      toast.success("Successfully Logged Out");
      navigate("/signIn");
    } catch (error) {
      toast.error(error.message);
    }
  };
  if (roleLoading) return <Loading />;
  return (
    <div className="bg-base-200">
      {/* Sidebar */}
      <div className="drawer xl:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Navbar */}
          <nav className="navbar md:px-6 px-3 rounded-3xl mt-8 bg-[linear-gradient(90deg,#020024_0%,#090979_35%,#00D4FF_100%)] p-6 md:p-8 shadow-sm border border-gray-100 max-w-[95%] mx-auto flex flex-col lg:flex-row gap-4">
            {/* LEFT: Header Text */}
            <div className="flex-1 space-y-4 lg:items-start items-center">
              <div className="relative">
                <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-200">
                  Welcome back,{" "}
                  <span className="text-primary">
                    {user?.displayName?.split(" ")[0] || "Citizen"}!
                  </span>
                </h1>

                <p className="text-sm text-gray-50 mt-2 font-medium">
                  Here's your URBANi overview for{" "}
                  <span className="text-white font-semibold">
                    {new Date().toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </p>
              </div>
              <div className="flex gap-2 justify-center lg:justify-start">
                {/* Drawer Toggle */}
                <label
                  htmlFor="my-drawer-4"
                  className="btn btn-secondary btn-sm btn-square rounded-full flex items-center justify-center w-8 h-8 p-0 lg:hidden"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="size-4"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                  >
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </label>
                <div className="w-8 h-8 bg-blue-100 rounded-full flex justify-center items-center">
                  <Mail strokeWidth={2.5} className="w-4 h-4 text-primary" />
                </div>
                <Link
                  className="w-8 h-8 bg-green-100 rounded-full flex justify-center items-center"
                  to={"/"}
                >
                  <Home strokeWidth={2.5} className="w-4 h-4 text-success" />
                </Link>
                <div className="w-8 h-8 bg-red-100 rounded-full flex justify-center items-center">
                  <Bell
                    strokeWidth={2.5}
                    className="w-4 h-4 text-warning font-black"
                  />{" "}
                </div>
              </div>
            </div>

            {/* RIGHT: Drawer toggle + actions */}
            <div className="flex flex-row items-start lg:items-center gap-3 justify-center lg:justify-end">
              {/* Action Button */}
              <Link
                to="/dashboard/my-profile"
                className="px-5 h-10 flex items-center justify-center gap-2 bg-primary hover:bg-secondary text-white font-bold text-xs rounded-3xl shadow-lg transition-all duration-300"
              >
                <Eye className="w-5 h-5" /> View Profile
              </Link>

              {role === "admin" && (
                <Link
                  to={"/?edit=true"}
                  className="px-5 h-10 flex items-center justify-center gap-2 bg-secondary hover:bg-primary text-white font-bold text-xs rounded-3xl shadow-lg transition-all duration-300"
                >
                  <Edit className="w-4 h-4" />
                  Home Editor
                </Link>
              )}
            </div>
          </nav>

          {/* Page content here */}
          <main className="my-6">
            <Outlet />
          </main>
        </div>

        <div className="drawer-side is-drawer-close:overflow-visible">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          <div className="flex min-h-full flex-col items-start md:w-1/3 w-2/3 lg:w-60 bg-black rounded-r-4xl shadow-xl">
            <div className="mx-auto bg-[#090979] w-full rounded-tr-4xl pb-8">
              {/* General Info */}
              <div className="flex flex-col items-center justify-center gap-3 pt-12 ">
                {/* Avatar */}
                <div className="w-20 h-20 border border-white flex justify-center items-center rounded-full">
                  <img
                    className="rounded-full w-16 h-16"
                    referrerPolicy="no-referrer"
                    src={user && user.photoURL ? user.photoURL : avatarImg}
                    alt="profile"
                    height="30"
                    width="30"
                  />
                </div>
                {/* Name & Email*/}
                <div className="text-center text-white space-y-1">
                  <h2 className="text-lg">{user?.displayName}</h2>
                  <p className="text-sm">{user?.email}</p>
                </div>
              </div>
            </div>
            {/* Sidebar content here */}
            <div className="w-full ml-4">
              <ul className="w-full grow flex flex-col gap-1">
                {/* Dashboard Links */}
                {/* Dashboard */}
                <li>
                  <SideBarLinks
                    to={"/dashboard"}
                    icon={MdOutlineDashboard}
                    label={"Dashboard"}
                  />
                </li>
                {/* Role === Citizen */}
                {role === "citizen" && (
                  <>
                    {/* Post Issues */}
                    <li>
                      <SideBarLinks
                        to={"report-issues"}
                        icon={Mic}
                        label={"Report Issues"}
                      />
                    </li>
                    {/* Reported Issues */}
                    <li>
                      <SideBarLinks
                        to={"my-reported-issues"}
                        icon={ListChecks}
                        label={"My Reported Issues"}
                      />
                    </li>
                    {/* My Payments */}
                    <li>
                      <SideBarLinks
                        to={"my-payments-history"}
                        icon={CreditCard}
                        label={"My Payments History"}
                      />
                    </li>
                  </>
                )}

                {/* Role === Admin */}
                {role === "admin" && (
                  <>
                    {/* All Reported Issues */}
                    <li>
                      <SideBarLinks
                        to={"all-reported-issues"}
                        icon={ListChecks}
                        label={"All Reported Issues"}
                      />
                    </li>
                    {/* Manage Citizens */}
                    <li>
                      <SideBarLinks
                        to={"manage-citizens"}
                        icon={Users}
                        label={"Manage Citizens"}
                      />
                    </li>
                    {/* Manage Staff */}
                    <li>
                      <SideBarLinks
                        to={"manage-staff"}
                        icon={UserCog}
                        label={"Manage Staff "}
                      />
                    </li>
                    {/* Payments History */}
                    <li>
                      <SideBarLinks
                        to={"payments-history"}
                        icon={CreditCard}
                        label={"Payments History"}
                      />
                    </li>
                  </>
                )}

                {/* Role === Staff */}
                {role === "staff" && (
                  <>
                    {/* Assigned Issues */}
                    <li>
                      <SideBarLinks
                        to={"assigned-issues"}
                        icon={ListChecks}
                        label={"Assigned Issues"}
                      />
                    </li>
                  </>
                )}

                {/* General Links */}
                {/* Home */}
                {/* <li>
                  <SideBarLinks to={"/"} icon={Home} label={"Home"} />
                </li>
                {/* Profile */}
                {/*<li>
                  <SideBarLinks
                    to={"my-profile"}
                    icon={User}
                    label={"My Profile"}
                  />
                </li> */}
                {/* Logout */}
                <li>
                  <SideBarLinks
                    icon={MdLogout}
                    label={"Logout"}
                    onClick={handleLogout}
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
