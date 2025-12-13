import { Link } from "react-router";

export const FancyButton = ({
  text,
  onClick,
  className = "",
  type = "button",
}) => {
  return (
    <button type={type} onClick={onClick} className={`fancy-btn ${className}`}>
      {text}
    </button>
  );
};

export const PrimaCTA = ({ text, to, className = "" }) => {
  return (
    <Link
      to={to}
      className={`
        fancy-btn
        relative w-56 bg-white text-primary font-bold py-3 px-5 
        rounded-full shadow-lg text-lg text-center transition duration-300 
        cursor-pointer z-12 hover:bg-primary hover:text-white
        ${className}
      `}
    >
      {text}
    </Link>
  );
};
