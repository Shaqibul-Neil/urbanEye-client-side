import { useEffect, useState } from "react";
import Navbar from "./Navbar";

const DefaultHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 400 ? setScrolled(true) : setScrolled(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <header className="w-full bg-base-200 shadow-sm">
      <div className="container mx-auto lg:px-6">
        <Navbar variant="default" scrolled={scrolled} />
      </div>
    </header>
  );
};

export default DefaultHeader;
