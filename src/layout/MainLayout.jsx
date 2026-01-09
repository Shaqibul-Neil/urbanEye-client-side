import { Outlet } from "react-router";
import Footer from "../components/common/footer/Footer";
import DefaultHeader from "../components/common/navbar/DefaultHeader";

const MainLayout = () => {
  return (
    <div>
      <DefaultHeader />
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
