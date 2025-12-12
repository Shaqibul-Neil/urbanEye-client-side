import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import Navbar from "../components/common/navbar/Navbar";
import Footer from "../components/common/footer/Footer";

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
          className="container mx-auto lg:px-6
          "
        >
          <Navbar scrolled={scrolled} />
        </div>
      </header>

      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;
