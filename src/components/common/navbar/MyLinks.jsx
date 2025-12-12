import { NavLink } from "react-router";

const MyLinks = ({ to, children, className }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? "text-primary bg-base-200 py-2 px-3 rounded-3xl transition-all duration-300"
          : `${className}`
      }
    >
      {children}
    </NavLink>
  );
};

export default MyLinks;
