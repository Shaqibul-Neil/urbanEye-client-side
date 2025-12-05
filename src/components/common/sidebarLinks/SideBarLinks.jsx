import { NavLink } from "react-router";

const SideBarLinks = ({ to, icon: Icon, label, onClick }) => {
  //button version
  if (onClick) {
    return (
      <button
        onClick={onClick}
        className="flex items-center gap-2 py-2 pl-2 text-base-200 transition-all duration-300 rounded-l-xl hover:bg-base-200 cursor-pointer hover:text-primary w-full font-semibold"
      >
        {Icon && <Icon className="w-4 h-4 text-warning"></Icon>}
        <span>{label}</span>
      </button>
    );
  }
  //NavLink version
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `flex items-center gap-2 py-2 pl-2 text-base-200 transition-all duration-300 rounded-l-xl tooltip tooltip-right font-semibold ${
          isActive
            ? "bg-base-200 text-primary"
            : "hover:bg-base-200 hover:text-primary"
        }`
      }
      data-tip={label}
    >
      {Icon && <Icon className="w-4 h-4 text-warning"></Icon>}
      <span className="font-semibold">{label}</span>
    </NavLink>
  );
};

export default SideBarLinks;
