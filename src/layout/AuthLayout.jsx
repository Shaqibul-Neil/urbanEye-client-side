import { Outlet } from "react-router";
import Navbar from "../components/common/navbar/Navbar";
import Footer from "../components/common/footer/Footer";

const AuthLayout = () => {
  return (
    <div>
      <header className="relative w-full bg-base-200">
        <div className="container mx-auto lg:px-6">
          <Navbar />
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

export default AuthLayout;
