import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/auth & role/useAuth";
import MyLinks from "./MyLinks";
import { Building2 } from "lucide-react";

const Navbar = ({ scrolled }) => {
  const { user, setUser, signOutUser } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    try {
      signOutUser();
      setUser(null);
      toast.success("Successfully Logged Out");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="navbar lg:py-4 md:py-3 md:px-4 px-2 lg:px-0">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden pl-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-100 mt-3 w-52 p-2 shadow text-secondary border border-primary"
          >
            <li>
              <MyLinks to={"/"}>Home</MyLinks>
            </li>
            <li>
              <MyLinks to={"/about"}>About</MyLinks>
            </li>
            <li>
              <MyLinks to={"/all-issues"}>All Issues</MyLinks>
            </li>
            <li>
              <MyLinks to={"/contact"}>Contact</MyLinks>
            </li>
          </ul>
        </div>
        <Link
          to={"/"}
          className="flex items-center gap-1 md:text-2xl text-xl font-bold"
        >
          <Building2 size={24} className="text-primary" />
          <span className="text-secondary font-extrabold leading-tight">
            URBAN
            <span className="text-primary">i</span>
          </span>
        </Link>
      </div>

      <div
        className={`navbar-center hidden lg:flex rounded-3xl px-6 py-4 transition-all duration-300 ease-in-out  ${
          scrolled
            ? "fixed top-4 left-1/2 transform -translate-x-1/2 md:w-96 w-full lg:px-10 md:px-4 px-1 bg-blue-100/80 backdrop-blur-2xl rounded-3xl z-50 flex justify-center items-center border-primary border-2"
            : "bg-white"
        }`}
      >
        <ul className="flex items-center gap-6 text-primary">
          <li>
            <MyLinks to={"/"}>Home</MyLinks>
          </li>
          <li>
            <MyLinks to={"/about"}>About</MyLinks>
          </li>
          <li>
            <MyLinks to={"/all-issues"}>All Issues</MyLinks>
          </li>
          <li>
            <MyLinks to={"/contact"}>Contact</MyLinks>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end z-50">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-9 border-2 border-gray-300 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  referrerPolicy="no-referrer"
                  src={
                    user?.photoURL ||
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-3 shadow space-y-1"
            >
              <div className="pb-1 border-b border-b-primary space-y-1 text-left">
                <li className="text-lg font-bold">{user?.displayName}</li>
              </div>
              <li className="mt-3">
                <MyLinks
                  to={"/dashboard"}
                  className="text-secondary  hover:text-primary transition-all duration-300 flex items-center text-sm"
                >
                  DashBoard
                </MyLinks>
              </li>

              <li>
                <button
                  className="text-secondary hover:text-primary transition-all duration-300 flex items-center cursor-pointer text-sm"
                  onClick={handleLogout}
                >
                  Sign Out
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link to={"/signin"} className={"btn btn-primary rounded-3xl"}>
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
