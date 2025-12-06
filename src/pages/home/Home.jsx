import { useState } from "react";
import { useLocation, useNavigate } from "react-router";

import { MdOutlineDashboard, MdLogout, MdList } from "react-icons/md";
import { Users, User, Home } from "lucide-react";

export default function SuperSidebar() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    { label: "Dashboard", to: "/dashboard", icon: MdOutlineDashboard },
    { label: "Report Issues", to: "/report-issues", icon: MdList },
    { label: "My Profile", to: "/my-profile", icon: User },
    { label: "Manage Citizens", to: "/manage-citizens", icon: Users },
    { label: "Home", to: "/", icon: Home },
  ];

  const handleNavigate = (to) => navigate(to);

  const handleLogout = () => {
    console.log("Logged out!");
    navigate("/signIn");
  };

  return (
    <>
      {/* Toggle Btn */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-4 left-4 z-50 bg-white p-2 rounded-full shadow-md lg:hidden"
      >
        <svg
          className="size-6 text-blue-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Overlay (mobile) */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 lg:hidden"
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full z-40 shadow-xl bg-blue-600 
        transition-all duration-300 
        ${open ? "w-64" : "w-14 lg:w-14"} 
        `}
      >
        {/* TOP PROFILE */}
        <div className="h-28 flex flex-col items-center justify-center border-b border-blue-500">
          <div className="w-16 h-16 rounded-full bg-white overflow-hidden">
            <img
              src="https://i.pravatar.cc/300"
              alt="user"
              className="w-full h-full object-cover"
            />
          </div>

          {open && (
            <div className="text-white text-center mt-2">
              <p className="font-semibold text-sm">Nil</p>
              <p className="text-xs opacity-90">Smart City User</p>
            </div>
          )}
        </div>

        {/* MENU LIST */}
        <ul className="mt-4">
          {menu.map(({ label, to, icon: Icon }) => {
            const active = location.pathname === to;

            return (
              <div key={to} className="flex h-12 cursor-pointer group">
                {/* Icon White Strip */}
                <div
                  onClick={() => handleNavigate(to)}
                  className={`
                    w-14
                    flex items-center justify-center 
                    bg-white 
                    border-r group-hover:bg-gray-100 
                    transition-all duration-200
                    ${active ? "bg-gray-100" : ""}
                  `}
                >
                  <Icon
                    className={`
                      size-5
                      ${active ? "text-blue-600" : "text-gray-700"}
                    `}
                  />
                </div>

                {/* Text Blue Strip */}
                {open && (
                  <div
                    onClick={() => handleNavigate(to)}
                    className={`
                      flex-1 flex items-center px-4 
                      text-white bg-blue-600
                      transition-all duration-200
                      group-hover:bg-blue-700
                      ${active ? "bg-blue-700" : ""}
                    `}
                  >
                    {label}
                  </div>
                )}
              </div>
            );
          })}

          {/* Logout */}
          <div className="flex h-12 cursor-pointer mt-4 group">
            <div
              onClick={handleLogout}
              className="w-14 flex items-center justify-center bg-white border-r group-hover:bg-gray-100 transition-all"
            >
              <MdLogout className="size-5 text-red-600" />
            </div>

            {open && (
              <div
                onClick={handleLogout}
                className="flex-1 flex items-center px-4 text-white bg-blue-600 group-hover:bg-blue-700 transition-all"
              >
                Logout
              </div>
            )}
          </div>
        </ul>
      </div>

      {/* MAIN PAGE SHIFT */}
      <div
        className={`transition-all duration-300 ${
          open ? "lg:pl-64" : "lg:pl-14"
        }`}
      >
        {/* তোমার page content */}
      </div>
    </>
  );
}
