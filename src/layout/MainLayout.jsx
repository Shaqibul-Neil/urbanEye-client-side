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
    <div className="flex flex-col min-h-screen">
      <header className="relative w-full">
        <div
          className={`transition-all duration-300 ease-in-out ${
            scrolled
              ? "fixed top-4 left-1/2 transform -translate-x-1/2 md:w-10/12 w-full lg:px-10 md:px-6 px-1 bg-blue-100/80 backdrop-blur-2xl rounded-lg z-50"
              : "container mx-auto"
          }`}
        >
          <Navbar />
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>
      <footer>Footer</footer>
    </div>
  );
};

export default MainLayout;
