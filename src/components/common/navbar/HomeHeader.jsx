import { useEffect, useState } from "react";
import Navbar from "./Navbar";

const HomeHeader = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="relative w-full">
      <div className="container mx-auto lg:px-6">
        <Navbar variant="home" scrolled={scrolled} />
      </div>
    </header>
  );
};

export default HomeHeader;
