import { NavLink } from "react-router";

const MyLinks = ({ to, children, className, variant = "default" }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? `bg-base-200 py-2 px-3 rounded-3xl transition-all duration-300 ${
              variant === "home" && "text-secondary"
            }`
          : `${className}`
      }
    >
      {children}
    </NavLink>
  );
};

export default MyLinks;
