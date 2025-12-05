import { Link, Outlet } from "react-router";
import { FaBell, FaChevronDown, FaHome } from "react-icons/fa";
import { AiOutlineMenu } from "react-icons/ai";
import { MdOutlineDashboard } from "react-icons/md";
import SideBarLinks from "../components/common/sidebarLinks/SideBarLinks";
import useAuth from "../hooks/auth & role/useAuth";
import { useState } from "react";
import avatarImg from "../assets/placeholder.jpg";

const DashboardLayout = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-base-200">
      {/* Sidebar */}
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
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
              className="my-1.5 inline-block size-8 lg:hidden"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
          {/* Page content here */}
          <main className="my-6 px-6">
            <Outlet />
          </main>
        </div>

        <div className="drawer-side is-drawer-close:overflow-visible">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="flex min-h-full flex-col items-start md:w-1/3 w-2/3 lg:w-60 bg-primary rounded-r-4xl space-y-4">
            <div className="mx-auto bg-[#1e4ec4] w-full rounded-tr-4xl pb-8">
              <div className="flex flex-col items-center justify-center gap-3 pt-12">
                {/* Avatar */}
                <div className="w-20 h-20 border border-white flex justify-center items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
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
            <div className="w-full pl-4">
              <h2 className="text-base-200 font-semibold leading-tight my-4">
                Menu
              </h2>
              {/* Sidebar content here */}
              <ul className="w-full grow flex flex-col gap-1">
                {/* List item */}
                {/* Our Dashboard Links */}
                <li>
                  <SideBarLinks
                    to={"/dashboard"}
                    icon={MdOutlineDashboard}
                    label={"Dashboard"}
                  />
                </li>
              </ul>
              <h2 className="text-base-200 font-semibold leading-tight my-1">
                General
              </h2>
              <ul className="flex flex-col w-full grow gap-1"></ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
