import { Link, Outlet, useLocation, useNavigate } from "react-router";
import { MdLogout, MdOutlineDashboard } from "react-icons/md";
import SideBarLinks from "../components/common/sidebarLinks/SideBarLinks";
import useAuth from "../hooks/auth & role/useAuth";
import avatarImg from "../assets/placeholder.webp";
import {
  Bell,
  CreditCard,
  Edit,
  Eye,
  Home,
  ListChecks,
  Mail,
  Mic,
  UserCog,
  Users,
} from "lucide-react";
import toast from "react-hot-toast";
import useRole from "../hooks/auth & role/useRole";
import Loading from "../components/loading/Loading";
import { motion, easeOut } from "framer-motion";
import Swal from "sweetalert2";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: easeOut,
      delay: 0.3,
    },
  },
};
const DashboardLayout = () => {
  const { user, signOutUser, setUser } = useAuth();
  const { role, roleLoading } = useRole();
  const navigate = useNavigate();
  const location = useLocation();
  //console.log(location);
  const handleLogout = async () => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#10b981",
        cancelButtonColor: "#ef4444",
        confirmButtonText: "Yes",
      });
      if (result.isConfirmed) {
        signOutUser();
        setUser(null);
        Swal.fire({
          title: "Logged Out!",
          text: "Successfully Logged Out",
          icon: "success",
        });

        navigate("/signIn");
      }
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
          <motion.nav
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="navbar md:px-6 px-3 rounded-3xl mt-8 bg-[linear-gradient(90deg,#020024_0%,#090979_35%,#00D4FF_100%)] p-6 md:p-8 shadow-sm border border-gray-100 max-w-[95%] mx-auto flex flex-col lg:flex-row gap-4"
          >
            {/* LEFT: Header Text */}
            <div className="flex-1 space-y-4 lg:items-start items-center">
              <div className="relative">
                <h1 className="text-2xl sm:text-4xl font-extrabold text-accent">
                  Welcome back,{" "}
                  <span className="text-white">
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
                  className="btn bg-white btn-sm btn-square rounded-full flex items-center justify-center w-8 h-8 p-0 xl:hidden"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="size-4"
                    fill="none"
                    stroke="#020617"
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
              {location.pathname !== "/dashboard/my-profile" && (
                <Link
                  to="/dashboard/my-profile"
                  className="px-5 h-10 flex items-center justify-center gap-2 bg-white hover:bg-secondary text-secondary hover:text-white font-bold text-xs rounded-3xl shadow-lg transition-all duration-800"
                >
                  <Eye className="w-5 h-5" /> View Profile
                </Link>
              )}

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
          </motion.nav>

          {/* Page content here */}
          <main className="my-6 2xl:mx-5 xl:mx-2">
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
