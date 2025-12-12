import { useEffect } from "react";
import { useLocation } from "react-router";

const RouteTitle = ({ title, children }) => {
  const location = useLocation();
  useEffect(() => {
    document.title = `${title} - URBANi`;
  }, [location, title]);
  return <>{children}</>;
};

export default RouteTitle;
