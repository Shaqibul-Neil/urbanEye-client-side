import { Outlet, useNavigate } from "react-router";
import { MdLogout, MdOutlineDashboard } from "react-icons/md";
import SideBarLinks from "../components/common/sidebarLinks/SideBarLinks";
import useAuth from "../hooks/auth & role/useAuth";
import avatarImg from "../assets/placeholder.jpg";
import {
  Bell,
  CreditCard,
  Home,
  ListChecks,
  Mail,
  Mic,
  User,
  UserCog,
  Users,
} from "lucide-react";
import toast from "react-hot-toast";
import useRole from "../hooks/auth & role/useRole";

const DashboardLayout = () => {
  const { user, signOutUser, setUser } = useAuth();
  const { role, roleLoading } = useRole();
  console.log(role);
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
  if (roleLoading) return <p>Role Loading....</p>;
  return (
    <div className="bg-base-200">
      {/* Static left bar
      <aside className="w-16 bg-white p-4 flex flex-col items-center border-r border-gray-100">
        {/* Icons or anything you want 
      </aside> */}
      {/* Sidebar */}
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Navbar */}
          <nav className="navbar lg:w-8/12 md:w-10/12 w-11/12 mx-auto bg-white flex justify-between lg:px-10 md:px-6 px-4 rounded-3xl mt-8 mb-12">
            <div className="flex justify-between items-center gap-2">
              <label
                htmlFor="my-drawer-4"
                aria-label="open sidebar"
                className="btn btn-square btn-primary lg:hidden btn-sm"
              >
                {/* Sidebar toggle icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-6 lg:hidden"
                >
                  <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                  <path d="M9 4v16"></path>
                  <path d="M14 10l2 2l-2 2"></path>
                </svg>
              </label>
              <h2 className="md:text-2xl text-sm text-primary font-extrabold">
                {" "}
                Welcome Back, {user?.displayName}
              </h2>
            </div>
            <div className="px-4 flex justify-between">
              <div className="flex justify-end items-center w-10 gap-2">
                <Bell className="w-8 h-8" />
                <Mail className="w-8 h-8" />
              </div>
            </div>
          </nav>
          {/* Page content here */}
          <main className="my-6 md:px-6 px-2">
            <Outlet />
          </main>
        </div>

        <div className="drawer-side is-drawer-close:overflow-visible">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          <div className="flex min-h-full flex-col items-start md:w-1/3 w-2/3 lg:w-60 bg-primary rounded-r-4xl shadow-xl">
            <div className="mx-auto bg-[#1e4ec4] w-full rounded-tr-4xl pb-8">
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
                <li>
                  <SideBarLinks to={"/"} icon={Home} label={"Home"} />
                </li>
                {/* Profile */}
                <li>
                  <SideBarLinks
                    to={"my-profile"}
                    icon={User}
                    label={"My Profile"}
                  />
                </li>
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
