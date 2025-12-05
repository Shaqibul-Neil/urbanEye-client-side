import { Link, Outlet } from "react-router";
import { FaBell, FaChevronDown, FaHome } from "react-icons/fa";
import { GoSidebarCollapse } from "react-icons/go";
import { MdOutlineDashboard } from "react-icons/md";
import SideBarLinks from "../components/common/sidebarLinks/SideBarLinks";

const DashboardLayout = () => {
  return (
    <div className="bg-base-200">
      {/* Navbar */}
      <nav className="flex justify-between items-center bg-white py-1 px-1 md:px-2 lg:px-5">
        <div className="navbar flex-1 items-center md:gap-10 gap-3">
          <div>
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="cursor-pointer"
            >
              {/* Sidebar toggle icon */}
              <GoSidebarCollapse className="text-secondary w-5 h-5 lg:hidden mt-4" />
            </label>
          </div>
        </div>
        <div className="flex items-center mt-4">
          <div className="mr-1 cursor-pointer">
            <div className="w-9 h-9 bg-[#EAECED] rounded-full flex items-center justify-center">
              <FaBell className="w-5 h-5 text-secondary" />
            </div>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-9 h-9 border-2 border-gray-300 rounded-full">
              {/* <img
                className="w-full h-full rounded-full"
                alt="Tailwind CSS Navbar component"
                referrerPolicy="no-referrer"
                src={user.photoURL}
              /> */}
            </div>
            <div className="hidden md:block">
              <h2 className="text-accent font-extrabold leading-tight text-base">
                {/* {user?.displayName} */}
              </h2>
            </div>
          </div>
          <div className="dropdown dropdown-end z-50">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-primary btn-circle avatar"
            >
              <FaChevronDown />
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow space-y-1"
            >
              <div className="pb-3 space-y-1 text-left">
                <li className="group">
                  <Link
                    to={"/"}
                    className="flex items-center gap-2 group-hover:bg-primary transition-all duration-300 rounded-xl"
                  >
                    {/* Home icon */}
                    <FaHome className="w-4 h-4 text-accent group-hover:text-secondary" />

                    <span className="text-accent text-base group-hover:text-secondary font-semibold">
                      Home
                    </span>
                  </Link>
                </li>
                <li className="group">
                  <Link
                    to={"/be-a-rider"}
                    className="flex items-center gap-2 group-hover:bg-primary transition-all duration-300 rounded-xl"
                  >
                    {/* Home icon */}
                    <FaHome className="w-4 h-4 text-accent group-hover:text-secondary" />

                    <span className="text-accent text-base group-hover:text-secondary font-semibold">
                      Be A Rider
                    </span>
                  </Link>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </nav>
      {/* Sidebar */}
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
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
          <div className="flex min-h-full flex-col items-start md:w-1/2 w-2/3 lg:w-52 pl-5 bg-primary">
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
  );
};

export default DashboardLayout;
