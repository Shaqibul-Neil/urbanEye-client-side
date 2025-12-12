import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import Navbar from "../components/common/navbar/Navbar";

const MainLayout = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 400 ? setScrolled(true) : setScrolled(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div>
      <header className="relative w-full bg-base-200">
        <div
          className={`transition-all duration-300 ease-in-out ${
            scrolled
              ? "fixed top-4 left-1/2 transform -translate-x-1/2 md:w-10/12 w-full lg:px-10 md:px-6 px-1 bg-blue-100/80 backdrop-blur-2xl rounded-lg z-50"
              : "container mx-auto lg:px-6"
          }`}
        >
          <Navbar />
        </div>
      </header>

      <main>
        <Outlet />
      </main>
      <footer>Footer</footer>
    </div>
  );
};

export default MainLayout;
